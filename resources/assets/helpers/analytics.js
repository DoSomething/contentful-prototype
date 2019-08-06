/* global window */

import { get, snakeCase, startCase } from 'lodash';
import { Engine as PuckClient } from '@dosomething/puck-client';

import { PUCK_URL } from '../constants';
import { get as getHistory } from '../history';
import { debug, stringifyNestedObjects, withoutValueless, query } from '.';

/**
 * App name prefix used for event naming.
 *
 * @type {String}
 */
const APP_PREFIX = 'phoenix';

/**
 * Variable that stores the instance of PuckClient.
 *
 * @type {null|Object}
 */
let puckClient = null;

/**
 * Wrapper function to allow executing additional calls when an analytics event is triggered.
 *
 * @param  {String}   type
 * @param  {Array}    args
 * @param  {Function} callback
 * @return {void}
 */
export function analyze(type, args, callback) {
  callback(args);

  debug().log(type, args);
}

/**
 * Parse analytics event name parameters into a snake cased string.
 *
 * @param  {String}      verb
 * @param  {String}      noun
 * @param  {String|Null} [adjective=null]
 * @return {void}
 */
const formatEventName = (verb, noun, adjective = null) => {
  let eventName = `${APP_PREFIX}_${snakeCase(verb)}_${snakeCase(noun)}`;

  // Append adjective if defined.
  eventName += adjective ? `_${snakeCase(adjective)}` : '';

  return eventName;
};

/**
 * Send event to analyze with Google Analytics.
 *
 * @param  {String} category
 * @param  {String} action
 * @param  {String} label
 * @param  {Object} data
 * @return {void}
 */
export function analyzeWithGoogle(name, category, action, label, data) {
  if (!name || !category || !action || !label) {
    console.error('Some expected data is missing!');
    return;
  }

  const flattenedData = stringifyNestedObjects(data);

  if (window.AUTH.id) {
    flattenedData.userId = window.AUTH.id;
  }

  const analyticsEvent = {
    event: name,
    eventAction: startCase(action),
    eventCategory: startCase(category),
    eventLabel: startCase(label),
    ...flattenedData,
  };

  // Push event action to Google Tag Manager's data layer.
  window.dataLayer = window.dataLayer || [];

  analyze('google', analyticsEvent, data => {
    window.dataLayer.push(data);
  });
}

/**
 * Send event to analyze with Puck.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {void}
 */
export function analyzeWithPuck(name, data) {
  if (!puckClient) {
    puckClient = new PuckClient({
      source: 'phoenix-next',
      getUser: () => window.AUTH.id,
      isAuthenticated: () => window.AUTH.isAuthenticated,
      puckUrl: PUCK_URL,
      history: getHistory(),
    });
  }

  puckClient.trackEvent(name, data);
}

/**
 * Send event to analyze with Snowplow.
 *
 * @param  {String} name
 * @param  {String} category
 * @param  {String} action
 * @param  {String} label
 * @param  {Object} data
 * @return {void}
 */
export function analyzeWithSnowplow(name, category, action, label, data) {
  if (!window.snowplow) {
    return;
  }

  const analyticsEvent = [
    'trackStructEvent',
    category,
    action,
    label,
    name,
    null,
    [
      {
        schema: `${window.ENV.PHOENIX_URL}/snowplow_schema.json`,
        data: {
          payload: JSON.stringify(data),
        },
      },
    ],
  ];

  analyze('snowplow', analyticsEvent, data => {
    window.snowplow(...data);
  });
}

/**
 * Dispatch analytics event to specified service, or all services by default.
 *
 * @param  {String}      category
 * @param  {String}      name
 * @param  {Object|Null} [data]
 * @param  {String|Null} [service]
 * @return {void}
 */
const sendToServices = (name, category, action, label, data, service) => {
  switch (service) {
    case 'ga':
      analyzeWithGoogle(name, category, action, label, data);
      break;

    case 'puck':
      analyzeWithPuck(name, data);
      break;

    default:
      analyzeWithGoogle(name, category, action, label, data);
      analyzeWithPuck(name, data);
      analyzeWithSnowplow(name, category, action, label, data);
  }
};

/**
 * Format analytics event noun string.
 *
 * @param  {String} string
 * @return {String}
 */
export function formatEventNoun(string) {
  if (!string) {
    console.error('Event Noun text string was not provided!');
    return null;
  }

  const submissionActions = [
    'photo',
    'referral',
    'share-social',
    'text',
    'voter-reg',
  ];

  let noun = string;

  if (submissionActions.indexOf(noun) >= 0) {
    noun = `${noun}_submission_action`;
  }

  return noun.replace(/-/g, '_');
}

/**
 * Get additional context data.
 *
 * @return {Object}
 */
export function getAdditionalContext() {
  return {
    utmSource: query('utm_source'),
    utmMedium: query('utm_medium'),
    utmCampaign: query('utm_campaign'),
  };
}

/**
 * Track page views on initial load and for any changes in History interface.
 *
 * @param  {Object} history
 * @return {void}
 */
export function trackAnalyticsPageView(history) {
  const context = {
    ...getAdditionalContext(),
    campaignId: get(window, 'STATE.campaign.campaignId', null),
    pageId:
      get(window, 'STATE.campaign.id', null) ||
      get(window, 'STATE.page.id', null),
  };

  const data = {
    schema: `${window.ENV.PHOENIX_URL}/snowplow_schema.json`,
    data: {
      payload: JSON.stringify(withoutValueless(context)),
    },
  };

  const analyticsEvent = ['trackPageView', null, [data]];

  history.listen(() => {
    analyze('snowplow', analyticsEvent, data => {
      window.snowplow(...data);
    });
  });

  analyze('snowplow', analyticsEvent, data => {
    window.snowplow(...data);
  });
}

/**
 * Track an analytics event with a specified service.
 * (Defaults to tracking with all services.)
 *
 * @param  {Object} options
 * @param  {Object} options.metadata
 * @param  {Object} options.context
 * @param  {String} options.service
 * @return {void}
 */
export function trackAnalyticsEvent({ metadata, context = {}, service }) {
  if (!metadata) {
    console.error('The metadata object is missing!');
    return;
  }

  const { adjective, category, target, noun, verb } = metadata;
  const label = metadata.label || noun;

  const name = formatEventName(verb, noun, adjective);

  const action = snakeCase(`${target}_${verb}`);

  const data = withoutValueless({
    ...context,
    ...getAdditionalContext(),
  });

  sendToServices(name, category, action, label, data, service);
}

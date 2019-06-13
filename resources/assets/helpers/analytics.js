/* global window */

import { snakeCase, startCase } from 'lodash';
import { Engine as PuckClient } from '@dosomething/puck-client';
import {
  dimensionByCookie,
  init,
  pageview,
  analyze,
} from '@dosomething/analytics';

import { PUCK_URL } from '../constants';
import { stringifyNestedObjects, withoutValueless, query } from '.';
import { get as getHistory } from '../history';

// App name prefix used for event naming.
const APP_PREFIX = 'phoenix';

// Variable that stores the instance of PuckClient.
let puckClient = null;

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
  if (!category || !action) {
    console.error('The Category or Action is missing!');
    return;
  }

  // @DEPRECATE
  // Format the event parameter as expected by the analyze method.
  const identifier = `${category}:${action}:${label}`;

  // @DEPRECATE
  analyze(identifier);

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
  window.dataLayer.push(analyticsEvent);
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

  window.snowplow('trackStructEvent', category, action, label, name, null, [
    {
      schema: `${window.ENV.PHOENIX_URL}/snowplow_schema.json`,
      data: {
        payload: JSON.stringify(data),
      },
    },
  ]);
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
 * Watch the given parameters for changes in their state
 * and record it to Google Analytics.
 */
export function googleAnalyticsInit(history) {
  init('track');

  dimensionByCookie('platform');

  // Track page changes for Google Analytics
  history.listen(() => {
    pageview(window.location.pathname);
  });

  pageview(window.location.pathname);
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
    utmSource: query('utm_source'),
    utmMedium: query('utm_medium'),
    utmCampaign: query('utm_campaign'),
  });

  sendToServices(name, category, action, label, data, service);
}

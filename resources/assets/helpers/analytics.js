/* global window */

import {
  camelCase,
  get,
  isString,
  isPlainObject,
  mapKeys,
  snakeCase,
  startCase,
} from 'lodash';

import { getUtms } from './utm';
import { debug, stringifyNestedObjects, withoutValueless } from '.';

/**
 * App name prefix used for event naming.
 *
 * @type {String}
 */
const APP_PREFIX = 'phoenix';

export const EVENT_CATEGORIES = {
  accountEdit: 'account_edit',
  authentication: 'authentication',
  campaignAction: 'campaign_action',
  focusedField: 'focused_field',
  modal: 'modal',
  navigation: 'navigation',
  onboarding: 'onboarding',
  search: 'search',
  signup: 'signup',
  siteAction: 'site_action',
  socialShare: 'social_share',
  waypoint: 'waypoint',
};

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

  window.dataLayer.push(analyticsEvent);
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
    snakeCase(category),
    snakeCase(action),
    snakeCase(label),
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

  analyze('snowplow', analyticsEvent, payload => {
    window.snowplow(...payload);
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
    case 'google':
      analyzeWithGoogle(name, category, action, label, data);
      break;

    case 'snowplow':
      analyzeWithSnowplow(name, category, action, label, data);
      break;

    default:
      analyzeWithGoogle(name, category, action, label, data);
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
 * Get page context data.
 *
 * @return {Object}
 */
export function getPageContext() {
  return {
    campaignId: get(window, 'STATE.campaign.campaignId', null),
    pageId:
      get(window, 'STATE.campaign.id', null) ||
      get(window, 'STATE.page.id', null),
  };
}

/**
 * Get UTM context data.
 *
 * @return {Object}
 */
export function getUtmContext() {
  const utms = getUtms();

  // For analytics, we prefer camelCased keys:
  return mapKeys(utms, (value, key) => camelCase(key));
}

/**
 * Track page views on initial load and for any changes in History interface.
 *
 * @param  {Object} history
 * @return {void}
 */
export function trackAnalyticsPageView(history) {
  const context = {
    ...getUtmContext(),
    ...getPageContext(),
  };

  const data = {
    schema: `${window.ENV.PHOENIX_URL}/snowplow_schema.json`,
    data: {
      payload: JSON.stringify(withoutValueless(context)),
    },
  };

  const analyticsEvent = ['trackPageView', null, [data]];

  history.listen(() => {
    analyze('snowplow', analyticsEvent, payload => {
      window.snowplow(...payload);
    });
  });

  analyze('snowplow', analyticsEvent, payload => {
    window.snowplow(...payload);
  });
}

/**
 * Track an analytics event with a specified service.
 * (Defaults to tracking with all services.)
 *
 * @deprecated
 * @param  {Object} options
 * @param  {Object} options.metadata
 * @param  {Object} options.context
 * @param  {String} options.service
 * @return {void}
 */
export function legacyTrackAnalyticsEvent({ metadata, context = {}, service }) {
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
    ...getUtmContext(),
  });

  sendToServices(name, category, action, label, data, service);
}

/**
 * Track an analytics event with a specified service.
 * (Defaults to tracking with all services.)
 *
 * @param  {String} name
 * @param  {Object} metadata
 * @param  {String} options.action
 * @param  {String} options.category
 * @param  {String} options.label
 * @param  {Object} options.context
 * @param  {String} options.service
 * @return {void}
 */
export function trackAnalyticsEvent(name, metadata = {}) {
  // @REMOVE: Temporarily check to see if name is an object, and if so send it to the
  // old legacyTrackAnalyticsEvent(); this will allow us to incrementally switch
  // calls to the new trackAnalyticsEvent() without breaking everything!
  if (isPlainObject(name)) {
    legacyTrackAnalyticsEvent(arguments[0]); // eslint-disable-line prefer-rest-params

    return;
  }

  // @REMOVE: We will switch back to destructuring the variables in the function signature,
  // but while we support the legacyTrackAnalyticsEvent(), we need to destruct after
  // checking against whether name is a string or object or will error out.
  const { action, category, label, context = {}, service } = metadata;

  // @TODO: uncomment out this code once all the events have had their categories
  // updated to use the new EVENT_CATEGORIES object.
  // if (!EVENT_CATEGORIES[category]) {
  //   console.error('The event category specified is not valid!');

  //   return;
  // }

  if (!isString(name)) {
    console.error('Please provide a string for the event name!');

    return;
  }

  const data = withoutValueless({
    ...context,
    ...getUtmContext(),
  });

  sendToServices(
    snakeCase(`${APP_PREFIX}_${name}`),
    category,
    action,
    label,
    data,
    service,
  );
}

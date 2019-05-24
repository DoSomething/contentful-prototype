/* global window */

import { snakeCase } from 'lodash';
import { Engine as PuckClient } from '@dosomething/puck-client';
import {
  dimensionByCookie,
  init,
  pageview,
  analyze,
} from '@dosomething/analytics';

import { PUCK_URL } from '../constants';
import snowplowSchema from '../schemas/snowplow.json';
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
 * @return {void}
 */
export function analyzeWithGoogleAnalytics(category, action) {
  if (!category || !action) {
    console.error('The Category or Action is missing!');
    return;
  }

  const label = window.location.pathname;

  // Format the event parameter as expected by the analyze method.
  const identifier = `${category}:${action}:${label}`;

  analyze(identifier);

  // Push event action to Google Tag Manager's data layer.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ category, event: action, label });
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
 * @param  {String} category
 * @param  {String} name
 * @param  {Object} payload
 * @return {void}
 */
export function analyzeWithSnowplow(category, name, payload) {
  const label = window.location.pathname;

  // https://gist.githubusercontent.com/weerd/f361ce33d27d9072c2d49aafe2494874/raw/c3c5915410ae1ee6b793ff3fa5bd36b61a92d21b/snowplow_schema.json

  window.snowplow('trackStructEvent', category, name, label, null, null, [
    {
      schema: snowplowSchema,
      data: {
        payload: JSON.stringify(payload),
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
const sendToServices = (category, name, data, service) => {
  switch (service) {
    case 'ga':
      analyzeWithGoogleAnalytics(category, name);
      break;

    case 'puck':
      analyzeWithPuck(name, data);
      break;

    default:
      analyzeWithGoogleAnalytics(category, name);
      analyzeWithPuck(name, data);
      analyzeWithSnowplow(category, name, data);
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
 * Track an analytics event with a specified service. (Defaults to tracking with all services.)
 *
 * @param  {Object}      options
 * @param  {String}      options.verb
 * @param  {String}      options.noun
 * @param  {String}      [options.adjective]
 * @param  {Object|Null} [options.data]
 * @param  {String|Null} [options.service]
 * @return {void}
 */
export function trackAnalyticsEvent({ verb, noun, adjective, data, service }) {
  if (!verb || !noun) {
    console.error('The Verb or Noun is missing!');
    return;
  }

  console.log('🗿', {
    verb,
    noun,
    adjective,
    data,
    service,
  });

  // {verb: "focused", noun: "text_submission_action", adjective: "text", data: {…}, service: undefined}
  // adjective: "text"
  // data:
  // contentfulId: "2kignGID0Qyyy6g08c20uc"
  // __proto__: Object
  // noun: "text_submission_action"
  // service: undefined
  // verb: "focused"
  // __proto__: Object

  const eventName = formatEventName(verb, noun, adjective);

  // Define category parameter for Google Analytics.
  const category = `${APP_PREFIX}_${snakeCase(noun)}`;

  sendToServices(category, eventName, data, service);
}

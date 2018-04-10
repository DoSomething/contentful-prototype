/* global window */

import { Engine as PuckClient } from '@dosomething/puck-client';
import { dimensionByCookie, init, pageview } from '@dosomething/analytics';

import { PUCK_URL } from '../constants';
import { getUserId } from '../selectors/user';
import { get as getHistory } from '../history';

/**
 * Send event to analyze with Google Analytics.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {void}
 */
export function analyzeWithGoogleAnalytics(name, data) {
  console.log('Analyze event using Google Analytics');
  console.log(name);
  console.log(data);
}

/**
 * Send event to analyze with Puck.
 *
 * @param  {String} name
 * @param  {Object} data
 * @param  {Object} state
 * @return {void}
 */
export function analyzeWithPuck(name, data, state) {
  const Puck = new PuckClient({
    source: 'phoenix-next',
    getUser: () => getUserId(state),
    puckUrl: PUCK_URL,
    history: getHistory(),
  });

  Puck.trackEvent(name, data);
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
 *
 * @param  {String} name
 * @param  {Object} data
 * @param  {String} service
 * @return {Object}
 */
export function trackAnalyticsEvent(name, data, service) {
  switch (service) {
    case 'ga':
      analyzeWithGoogleAnalytics(name, data);
      break;

    case 'puck':
      analyzeWithPuck(name, data, window.STATE);
      break;

    default:
      console.error(`The "${service}" service is missing, not supported or incorrect!`);
  }
}

/**
 * Track an analytics event with Google Analytics.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {Function}
 */
export function trackGoogleAnalyticsEvent(name, data) {
  trackAnalyticsEvent(name, data, 'ga');
}

/**
 * Track an analytics event with Puck.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {Function}
 */
export function trackPuckEvent(name, data) {
  trackAnalyticsEvent(name, data, 'puck');
}

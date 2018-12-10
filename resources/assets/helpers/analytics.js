/* global window */

import { Engine as PuckClient } from '@dosomething/puck-client';
import {
  dimensionByCookie,
  init,
  pageview,
  analyze,
} from '@dosomething/analytics';

import { PUCK_URL } from '../constants';
import { get as getHistory } from '../history';

// App name prefix used for event naming.
const APP_NAME = 'phoenix';

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
}

/**
 * Send event to analyze with Puck.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {void}
 */
export function analyzeWithPuck(name, data) {
  const Puck = new PuckClient({
    source: 'phoenix-next',
    getUser: () => window.AUTH.id,
    isAuthenticated: () => window.AUTH.isAuthenticated,
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
      analyzeWithPuck(name, data);
      break;

    default:
      console.error(
        `The "${service}" service is missing, not supported or incorrect!`,
      );
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

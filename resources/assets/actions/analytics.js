import { TRACK_ANALYTICS_EVENT } from '../constants/action-types';

/**
 * Track an analytics event with a specified service.
 *
 * @param  {String} name
 * @param  {Object} data
 * @param  {String} service
 * @return {Object}
 */
export function trackAnalyticsEvent(name, data, service) {
  return {
    type: TRACK_ANALYTICS_EVENT,
    meta: { service },
    payload: { name, data },
  };
}

/**
 * Track an analytics event with Google Analytics.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {Function}
 */
export function trackGoogleAnalyticsEvent(name, data) {
  return dispatch => (
    dispatch(trackAnalyticsEvent(name, data, 'ga'))
  );
}

/**
 * Track an analytics event with Puck.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {Function}
 */
export function trackPuckEvent(name, data) {
  return dispatch => (
    dispatch(trackAnalyticsEvent(name, data, 'puck'))
  );
}

import { isEmpty } from 'lodash';

import { query, withoutValueless } from '.';

const UTM_SESSION_KEY = 'ds_utm_params';

/**
 * Get UTM parameters from session storage.
 *
 * @param  {String} key
 * @return {Object}
 */
export function getSessionUtms(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

/**
 * Store UTM parameters in session storage.
 *
 * @param  {String} key
 * @param  {Object} utms
 * @return {Object}
 */
export function setSessionUtms(key, utms) {
  sessionStorage.setItem(key, JSON.stringify(utms));

  return utms;
}

/**
 * Get UTMs from session storage or query parameters.
 *
 * @return {Object}
 */
export function getUtmParameters() {
  const sessionUtms = getSessionUtms(UTM_SESSION_KEY);

  return !isEmpty(sessionUtms)
    ? sessionUtms
    : withoutValueless({
        utm_source: query('utm_source'),
        utm_medium: query('utm_medium'),
        utm_campaign: query('utm_campaign'),
      });
}

/**
 * Persist UTM parameters in session storage.
 *
 * @return void
 */
export function persistUtms() {
  // Check to see if there are any utms in session storage:
  const sessionUtms = getSessionUtms(UTM_SESSION_KEY);

  // If utms in session storage, no need to store them again, so exit out.
  if (!isEmpty(sessionUtms)) {
    return;
  }

  // Get any existing session utms or current query param utms:
  const utms = getUtmParameters();

  // If no session utms, then store the current query param utms:
  if (isEmpty(sessionUtms) && !isEmpty(utms)) {
    setSessionUtms(UTM_SESSION_KEY, utms);
  }
}

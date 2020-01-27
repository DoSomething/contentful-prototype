/* global history */
/* eslint-disable no-restricted-globals */

import { isEmpty } from 'lodash';

import { appendToQuery, query, withoutValueless } from '.';

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
 * Get UTM parameters.
 *
 * @return {Object}
 */
export function getUtmParameters() {
  return {
    utm_source: query('utm_source'),
    utm_medium: query('utm_medium'),
    utm_campaign: query('utm_campaign'),
  };
}

/**
 * Persist UTM parameters in session storage.
 *
 * @return void
 */
export function persistUtms() {
  // Get any current query param utms:
  const utms = withoutValueless(getUtmParameters());

  // Check to see if there are any in session storage:
  const sessionUtms = getSessionUtms(UTM_SESSION_KEY);

  // If no session utms, then store the current query param utms:
  if (isEmpty(sessionUtms) && !isEmpty(utms)) {
    setSessionUtms(UTM_SESSION_KEY, utms);

    return;
  }

  // If no current query param utms, but found session utms, add them to the URL:
  if (isEmpty(utms) && !isEmpty(sessionUtms)) {
    const url = appendToQuery(sessionUtms);

    history.replaceState(null, '', url.href);

    return;
  }
}

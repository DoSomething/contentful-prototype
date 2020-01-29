import { isEmpty } from 'lodash';

import { query, withoutValueless } from '.';

const UTM_SESSION_KEY = 'ds_utm_params';

/**
 * Parse UTM parameters from URL query.
 */
const parseUtmQuery = () =>
  withoutValueless({
    utm_source: query('utm_source'),
    utm_medium: query('utm_medium'),
    utm_campaign: query('utm_campaign'),
  });

/**
 * Get UTMs from session storage or fallback to query parameters.
 *
 * @return {Object}
 */
export function getUtms() {
  const sessionUtms = JSON.parse(sessionStorage.getItem(UTM_SESSION_KEY));

  // Just in case session storage fails, we'll fall back to current query:
  return !isEmpty(sessionUtms) ? sessionUtms : parseUtmQuery();
}

/**
 * Persist UTM parameters in session storage.
 *
 * @return void
 */
export function persistUtms() {
  const utms = parseUtmQuery();

  // If there are current query param utms, lets store them:
  if (!isEmpty(utms)) {
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(utms));
  }
}

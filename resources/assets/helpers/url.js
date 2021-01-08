/* global window, String, URL */

import queryString from 'query-string';
import { merge, isEmpty } from 'lodash';

import { withoutValueless } from './data';

const UTM_SESSION_KEY = 'ds_utm_params';

/**
 * Append query parameters to a URL even if it already has existing parameters.
 *
 * @param  {Object} additionalParameters
 * @param  {String} href
 * @return {URL}
 */
export function appendToQuery(
  additionalParameters,
  href = window.location.href,
) {
  const urlObject = new URL(href, window.location.origin);

  const mergedParameters = merge(
    queryString.parse(urlObject.search),
    additionalParameters,
  );

  urlObject.search = queryString.stringify(mergedParameters);

  return urlObject;
}

/**
 * Checks if current path matches an item in given paths array.
 *
 * @param {Array} paths
 * @return {Boolean}
 */
export const isCurrentPathInPaths = paths => {
  const pathname = window.location.pathname;

  return paths.find(path => {
    if (path.includes('*')) {
      const pathWithoutAsterisk = path.slice(0, -1);

      return (
        pathname.includes(pathWithoutAsterisk) &&
        pathname.length > pathWithoutAsterisk.length
      );
    }

    return path === pathname;
  });
};

/**
 * Return a boolean indicating whether the provided URL is external to the site.
 *
 * @param  {String} url
 * @return {Boolean}
 */
export function isExternal(url) {
  return (
    new URL(String(url), window.location.origin).hostname !==
    window.location.hostname
  );
}

/**
 * Construct absolute URL with query params.
 *
 * @param {String} url
 * @param {Object} query
 * @return {URL}
 */
export function makeUrl(path, queryParameters) {
  const urlObject = new URL(String(path));

  urlObject.search = queryString.stringify(queryParameters);

  return urlObject;
}

/**
 * Get the query-string value at the given key.
 *
 * @param  {String}   key
 * @param  {URL|Location}   url
 * @return {String|Undefined}
 */
export function query(key, url = window.location) {
  // Ensure we have a URL object from the location.
  const search = queryString.parse(url.search);

  return search[key];
}

/**
 * Parse UTM parameters from URL query.
 */
const parseUtmQuery = () =>
  withoutValueless({
    utm_source: query('utm_source'),
    utm_medium: query('utm_medium'),
    utm_campaign: query('utm_campaign'),
    utm_content: query('utm_content'),
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

export default null;

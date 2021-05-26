/* global window */

import { get } from 'lodash';
import queryString from 'query-string';

import { getUtms, query } from './url';
import { getCampaign } from './campaign';
import { withoutValueless } from './data';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from './analytics';

/**
 * Get the current UNIX timestamp (in seconds), optionally
 * adjusted by the given clock skew.
 *
 * @param {Number} skew
 * @return {Number}
 */
const now = (skew = 0) => Math.floor(+new Date() / 1000) + skew;

/**
 * Bind an event listener which will refresh the page
 * if the current access token is expired.
 */
export function bindTokenRefreshEvent() {
  const { token, expiresAt } = window.AUTH;

  // Take into account clock skew between server & user's browser:
  const skew = window.AUTH.now - now();

  // Refresh the page if our authentication token is expired:
  const authCheck = setInterval(() => {
    if (token) {
      // Read the current time, and adjust by our originally recorded
      // clock "skew" – so we make sure we're not refreshing until the
      // server expects this token to be expired.
      const expiresIn = expiresAt - now(skew);

      console.debug(`Token expires in ${Math.floor(expiresIn)} seconds.`);

      if (expiresIn < 0) {
        console.log('Token has expired! Refreshing...');

        trackAnalyticsEvent('refreshed_token', {
          action: 'token_refreshed',
          category: EVENT_CATEGORIES.authentication,
          label: 'token',
          context: { skew },
        });

        clearInterval(authCheck);
        window.location.reload(true);
      }
    }
  }, 5000);
}

/**
 * Get context data for auth redirect URL.
 *
 * @return {Object}
 */
export function getDataForAuthRedirect() {
  const campaign = getCampaign() || {};
  const page = get(window.STATE, 'page', {});

  const storyPageTitle =
    get(page, 'type') !== 'storyPage' && get(page, 'fields.title');

  return withoutValueless({
    // Used as 'destination' parameter for customized destination title on Northstar login page.
    title: get(campaign, 'title') || storyPageTitle,
    // For 'source_details':
    contentful_id: campaign.id || page.id,
    // Used to trigger a specific authentication flow (e.g. 'login').
    mode: query('mode') || null,
    referrer_user_id: query('referrer_user_id'),
    ...getUtms(),
  });
}

/**
 * Build authentication redirect URL with optional context data.
 *
 * @param  {Undefined|Object} options
 * @param  {Undefined|String} actionId
 * @param  {Undefined|String} destination
 * @return {String}
 */
export function buildAuthRedirectUrl({ options, actionId, destination } = {}) {
  const params = queryString.stringify(
    withoutValueless({
      actionId,
      options: JSON.stringify({ ...getDataForAuthRedirect(), ...options }),
      destination,
    }),
  );

  const url = new URL(`${window.location.origin}/authorize`);

  url.search = params;

  return url.href;
}

/**
 * Get the user id.
 *
 * @return {String}
 */
export function getUserId() {
  return get(window.AUTH, 'id', null);
}

/**
 * Get the user auth token.
 *
 * @return {String}
 */
export const getUserToken = () => window.AUTH.token;

/**
 * Check to see if user is authenticated.
 *
 * @return {Boolean}
 */
export function isAuthenticated() {
  return get(window.AUTH, 'isAuthenticated', false);
}

/**
 * Check to see if user is a DS.org staffer.
 *
 * @return {Boolean}
 */
export function isStaff() {
  const role = get(window.AUTH, 'role', 'user');

  return ['staff', 'admin'].includes(role);
}

/**
 * Redirect the user to a URL for authentication.
 *
 * @param {String} url
 */
export const redirect = url => {
  // If we're running our test suite, don't automatically initiate
  // the login redirect flow & leave something to assert on.
  if (window.Cypress) {
    document.body.innerHTML = `<div data-test="redirect" data-url="${url}" />`;
  } else {
    window.location = url;
  }
};

/**
 * This hook allows a component to trigger an authentication gate, and
 * optionally "flash" data to the session for when they return.
 *
 * @param {String} identifier
 * @param {Object} options
 * @param {Boolean} options.skip
 * @return {Array}
 */
export const useGate = (identifier, options = {}) => {
  if (options.skip) {
    return [{}, () => {}];
  }

  const item = window.sessionStorage.getItem(identifier);

  if (item) {
    window.sessionStorage.removeItem(identifier);
  }

  const state = JSON.parse(item) || {};

  const authenticate = newState => {
    window.sessionStorage.setItem(identifier, JSON.stringify(newState));

    const redirectUrl = buildAuthRedirectUrl();
    redirect(redirectUrl);
  };

  return [state, authenticate];
};

export default null;

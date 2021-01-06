/* global window */

import { get, isEmpty } from 'lodash';
import queryString from 'query-string';

import { withoutValueless } from '.';
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
 * Build authentication redirect URL with optional context data.
 *
 * @param  {Null|Object} options
 * @param  {Null|String} actionId
 * @return {String}
 */
export function buildAuthRedirectUrl(options = null, actionId = null) {
  const params = queryString.stringify(
    withoutValueless({
      actionId,
      options: !isEmpty(options) ? JSON.stringify(options) : null,
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
 * This hook allows a component to trigger an authentication gate, and
 * optionally "flash" data to the session for when they return.
 *
 * @param {String} identifier
 */
export const useGate = identifier => {
  const item = window.sessionStorage.getItem(identifier);

  if (item) {
    window.sessionStorage.removeItem(identifier);
  }

  const state = JSON.parse(item) || {};

  const authenticate = newState => {
    window.sessionStorage.setItem(identifier, JSON.stringify(newState));
    window.location = buildAuthRedirectUrl();
  };

  return [state, authenticate];
};

export default null;

/* global window */
import { isEmpty } from 'lodash';
import queryString from 'query-string';

import { withoutValueless } from '.';
import { trackAnalyticsEvent } from './analytics';

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

        trackAnalyticsEvent({
          context: { skew },
          metadata: {
            category: 'authentication',
            noun: 'token',
            target: 'token',
            verb: 'refreshed',
          },
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
  let params = queryString.stringify(
    withoutValueless({
      actionId,
      options: !isEmpty(options) ? JSON.stringify(options) : null,
    }),
  );

  const url = new URL(`${window.location.origin}/authorize`);

  url.search = params;

  return url.href;
}

export default null;

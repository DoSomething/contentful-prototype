/* global window, document */

import { env } from './env';
import { makeUrl } from './url';
import { openDialog } from './display';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from './analytics';

/**
 * Share a link via the Facebook Messenger app (for mobile devices).
 * Get a callback if the user is presumed to have been redirected to the
 * application or not.
 *
 * @param  {String}  href
 * @return {Promise}
 */
export function facebookMessengerShare(href) {
  // Capture if the user leaves the page (presumably meaning they've been successfully redirected to the Messenger app.)
  let switchedToApp = false;
  window.onblur = () => (switchedToApp = true);

  return new Promise((resolve, reject) => {
    const messengerAppUrl = makeUrl('fb-messenger://share', {
      link: href,
      app_id: env('FACEBOOK_APP_ID'),
    });
    window.location = messengerAppUrl.href;

    setTimeout(() => {
      // If our client still has not left the page, and the page is still in focus,
      // they presumably don't have the Messenger app.
      if (!switchedToApp && window.document.hasFocus()) {
        reject();
        // eslint-disable-next-line no-alert
        window.alert(
          'Sorry, you need to have the Facebook Messenger app installed to send a message.',
        );
      } else {
        window.onblur = null;
        resolve();
      }
    }, 1500);
  });
}

/**
 * Load and return the Facebook SDK.
 */
export function loadFacebookSDK() {
  return new Promise(resolve => {
    if (document.getElementById('facebook-jssdk')) {
      resolve(window.FB);
    }

    // Set init callback for once we've loaded Facebook's SDK:
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: env('FACEBOOK_APP_ID'),
        version: 'v2.8',
      });

      resolve(window.FB);
    };

    const script = document.createElement('script');

    script.id = 'facebook-jssdk';
    script.src = '//connect.facebook.net/en_US/sdk.js';

    document.head.append(script);
  });
}

/**
 * Share a link by generating a Facebook dialog.
 * Get a callback if the share is successful or not.
 *
 * @param  {Object}  options
 * @return {Promise}
 */
export function showFacebookDialog(options) {
  return new Promise((resolve, reject) => {
    const handler = success => (success ? resolve() : reject());
    return window.FB.ui(options, handler);
  });
}

/**
 * Generate a Facebook Send Dialog
 *
 * @param {String} href
 */
export function showFacebookSendDialog(href) {
  return showFacebookDialog({
    method: 'send',
    link: href,
  });
}

/**
 * Generate a Facebook Share Dialog
 *
 * @param {String} href
 * @param {String} quote
 */
export function showFacebookShareDialog(href, quote = null) {
  return showFacebookDialog({
    method: 'share',
    quote,
    href,
  });
}

/**
 * Share a link by opening a Facebook share prompt.
 *
 * @param  {String} href
 * @param  {String} quote
 */
export function showFacebookSharePrompt(href, callback) {
  const intent = makeUrl('https://www.facebook.com/dialog/share', {
    app_id: env('FACEBOOK_APP_ID'),
    href,
  });

  openDialog(intent, callback);
}

/**
 * Handle click event from Facebook share button
 *
 * @param {String} href
 * @param {Object} trackingData
 */
export function handleFacebookShareClick(href, trackingData) {
  trackAnalyticsEvent('clicked_share_facebook', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.socialShare,
    label: 'facebook',
    context: { ...trackingData, url: href },
  });

  // @todo 12/13/2018: Use the showFacebookShareDialog to track
  // 'completed' and 'cancelled' events as well.
  showFacebookSharePrompt(href);
}

export default null;

/* global window, document, snap */

import { EVENT_CATEGORIES, trackAnalyticsEvent } from './analytics';

/**
 * Load and return the Snapchat SDK.
 */
export function loadSnapchatSDK() {
  const script = document.createElement('script');
  script.id = 'snapkit-creative-kit-sdk';
  script.src = 'https://sdk.snapkit.com/js/v1/create.js';
  document.head.append(script);

  window.snapKitInit = function() {
    snap.creativekit.initalizeShareButtons(
      document.getElementsByClassName('snapchat-share-button'),
    );
  };
}

/**
 * Handle click event from a Snapchat share button
 *
 * @param {String} href
 * @param {Object} trackingData
 *
 */
export function handleSnapchatShareClick(href, trackingData) {
  trackAnalyticsEvent('clicked_share_snapchat', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.socialShare,
    label: 'snapchat',
    context: { ...trackingData, url: href },
  });
}

export default null;

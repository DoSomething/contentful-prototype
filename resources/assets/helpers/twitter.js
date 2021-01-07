import { makeUrl } from './url';
import { openDialog } from './display';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from './analytics';

/**
 * Share a link by opening a Twitter share prompt.
 *
 * @param  {String} href
 * @param  {String} quote
 */
export function showTwitterSharePrompt(href, quote = '', callback) {
  const intent = makeUrl('https://twitter.com/intent/tweet', {
    url: href,
    text: quote,
  });

  openDialog(intent, callback);
}

/**
 * Handle click event from a Twitter share button
 *
 * @param {String} href
 * @param {Object} trackingData
 * @param {String} quote
 */
export function handleTwitterShareClick(href, trackingData, quote = '') {
  trackAnalyticsEvent('clicked_share_twitter', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.socialShare,
    label: 'twitter',
    context: { ...trackingData, url: href },
  });

  showTwitterSharePrompt(href, quote);
}

export default null;

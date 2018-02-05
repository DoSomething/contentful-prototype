/* global window */

import { Engine } from '@dosomething/puck-client';
import { env, query, showFacebookSharePrompt } from './helpers';

function renderSharePage(element) {
  const shareUrl = query('href');
  const puck = new Engine({
    source: 'phoenix-next',
    puckUrl: env('PUCK_URL'),
    getUser: () => window.STATE.user.id,
  });

  const trackingData = { shareUrl };
  puck.trackEvent('share page loaded', trackingData);

  // Wait for 'ready' event so we know FB SDK is loaded.
  element.addEventListener('click', (event) => {
    event.preventDefault();

    console.log('sharing', element, trackingData, window.FB);
    showFacebookSharePrompt({ href: shareUrl }, (response) => {
      console.log('showed prompt?', response);
      if (response) {
        element.innerHtml = '<h1>Thanks for sharing!</h1>'; // eslint-disable-line
        puck.trackEvent('share page completed', trackingData);
      } else {
        puck.trackEvent('share page cancelled', trackingData);
      }
    });
  });
}

export default renderSharePage;

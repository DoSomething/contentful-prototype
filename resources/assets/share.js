/* global window */

import { Engine } from '@dosomething/puck-client';
import { env, query, showFacebookSharePrompt } from './helpers';

function renderSharePage(element) {
  const button = element.querySelector('button');
  const shareUrl = query('href');
  const puck = new Engine({
    source: 'phoenix-next',
    puckUrl: env('PUCK_URL'),
    getUser: () => window.STATE.user.id,
  });

  const trackingData = { shareUrl };
  puck.trackEvent('share page loaded', trackingData);

  // Wait for 'ready' event so we know FB SDK is loaded.
  button.addEventListener('click', (event) => {
    event.preventDefault();

    console.log('sharing', element, trackingData, window.FB);
    showFacebookSharePrompt({ href: shareUrl }, (response) => {
      console.log('showed prompt?', response);
      if (response) {
        element.innerText = 'Thanks for sharing!'; // eslint-disable-line
        puck.trackEvent('share page completed', trackingData);
      } else {
        puck.trackEvent('share page cancelled', trackingData);
      }
    });
  });
}

export default renderSharePage;

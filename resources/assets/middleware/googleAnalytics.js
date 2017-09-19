/* global window */

import { dimensionByCookie, init, pageview } from '@dosomething/analytics';
import { get as getHistory } from '../history';

/**
 * Watch the given parameters for changes in their state
 * and record it to the appropriate service.
 */
export default function start() {
  init('track');

  dimensionByCookie('platform');

  // Track page changes for Google Analytics
  getHistory().listen(() => {
    pageview(window.location.pathname);
  });

  pageview(window.location.pathname);
}

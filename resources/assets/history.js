/* global window */

import createHistory from 'history/createBrowserHistory';

let history = null;

/**
 * Get the history object for this app
 * @return {History}
 */
export function get() {
  return history;
}

/**
 *  Initialize the history.
 *
 * @return {History}
 */
export function init() {
  // Set the application "base name" to /us/campaigns/:slug so all pages are relative to that.
  const basename = window.location.pathname.split('/').slice(0, 4).join('/');
  history = createHistory({ basename });

  return history;
}

/* global window */

import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

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

  const routerHistory = useRouterHistory(createBrowserHistory);
  history = routerHistory({ basename });

  return history;
}

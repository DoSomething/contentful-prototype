import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';

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
 * @param  {Object} store
 * @return {History}
 */
export function init(store) {
  // Set the application "base name" to /campaigns/:slug so all pages are relative to that.
  const basename = window.location.pathname.split('/').slice(0, 3).join('/');

  const routerHistory = useRouterHistory(createBrowserHistory);
  history = syncHistoryWithStore(routerHistory({basename}), store);

  return history;
}

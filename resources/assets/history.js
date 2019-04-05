import createHistory from 'history/createBrowserHistory';

import createHistoryHashObserver from './helpers/createHistoryHashObserver';

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
  history = createHistoryHashObserver(createHistory(), 10000);

  return history;
}

/* global window */

import { init, pageview } from '@dosomething/analytics';
import { ANALYTICS_ACTIONS } from '../actions';
import { get as getHistory } from '../history';
import {
  generateSessionId,
  isSessionValid,
  stateChanged,
  createDeviceId,
} from '../helpers/analytics';

/**
 * Check if the session is valid, if not update it.
 */
function checkSession() {
  if (! isSessionValid()) {
    generateSessionId();
  }
}

/**
 * Redux middleware for tracking state changes.
 *
 * @param  {Object} store Application store
 * @return {Object}
 */
export const observerMiddleware = store => next => (action) => {
  checkSession();

  if (! ANALYTICS_ACTIONS.includes(action.type)) return next(action);

  const result = next(action);
  stateChanged(action, store.getState());

  return result;
};

/**
 * Watch the given parameters for changes in their state
 * and record it to the appropriate service.
 */
export function start() {
  // Setup session
  createDeviceId();

  checkSession();

  // Initialize Analytics
  const env = window.ENV || {};
  init('track', true, env.KEEN_PROJECT_ID ? {
    projectId: env.KEEN_PROJECT_ID,
    writeKey: env.KEEN_WRITE_KEY,
  } : null);

  // Track page changes for Google Analytics
  getHistory().listen(() => {
    pageview(window.location.pathname);
  });

  pageview(window.location.pathname);
}

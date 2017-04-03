import {
  generateSessionid,
  isSessionValid,
  updateSession,
  getSession,
  createDeviceId,
  transformState,
} from '../helpers/analytics';

import {
  init,
  analyze,
  pageview,
} from '@dosomething/analytics';

/**
 * Transform the application state and push to Keen.io
 * Additionally bump the activity marker.
 *
 * @param  {Object} action Action that fired
 * @param  {Object} state  Application state
 */
function stateChanged(action, state) {
  updateSession();
  const transformation = transformState(action, state);

  analyze('action', transformation);
}

/**
 * Redux middleware for tracking state changes.
 *
 * @param  {Object} store Application store
 * @return {Object}
 */
export const observerMiddleware = store => next => action => {
  const result = next(action);
  stateChanged(action, store.getState());

  return result;
};

/**
 * Watch the given parameters for changes in there state
 * and record it to the appropiate service.
 *
 * @param  {Object} history Instance of React Router history
 * @param  {Object} store   Instance of a React Redux store
 * @return {Function}
 */
export default function (history, store) {
  // Setup session
  createDeviceId();
  if (!isSessionValid()) generateSessionid();

  // Initialize Analytics
  init('track', true, services.KEEN_PROJECT_ID ? {
    projectId: services.KEEN_PROJECT_ID,
    writeKey: services.KEEN_WRITE_KEY,
  } : null);

  // Track page changes for Google Analytics
  history.listen(({ basename, pathname }) => {
    let path = basename;
    if (pathname) path += pathname;

    pageview(path);
  });
  pageview(window.location.pathname);

  // Track state changes for Keen.io
  stateChanged({type: 'APPLICATION_INIT'}, store.getState());
}

import {
  generateSessionid,
  isSessionValid,
  stateChanged,
  createDeviceId,
} from '../helpers/analytics';

import { init, pageview } from '@dosomething/analytics';

import { ANALYTICS_ACTIONS } from '../actions';

/**
 * Redux middleware for tracking state changes.
 *
 * @param  {Object} store Application store
 * @return {Object}
 */
export const observerMiddleware = store => next => action => {
  if (! ANALYTICS_ACTIONS.includes(action.type)) return;

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

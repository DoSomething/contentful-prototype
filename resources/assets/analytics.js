import {
  generateSessionid,
  isSessionValid,
  updateSession,
  getSession,
  createDeviceId,
} from './helpers';

import {
  init,
  analyze
} from '@dosomething/analytics';

/**
 * Track a page has been viewed for Google Analytics
 *
 * @param  {String} path path of the page
 */
function pageView(path) {
  if (typeof ga === 'undefined') return;

  ga('send', 'pageview', path);
}

/**
 * Prepare the state for being sent to Keen.io
 *
 * @param  {Object} action Action that fired
 * @param  {Object} state  Application state
 * @return {Object}        Object to send
 */
function transformState(action, state) {
  const transformation = {
    feed: {
      page: state.blocks.offset,
    },
    campaign: state.campaign,
    page: {
      base: state.routing.locationBeforeTransitions.basename,
      path: state.routing.locationBeforeTransitions.pathname,
    },
    signups: state.signups,
    submissions: state.submissions,
    user: {
      session: getSession(),
      ...state.user,
    },
    action,
  };

  return transformation;
}

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

    pageView(path);
  });
  pageView(window.location.pathname);

  // Track state changes for Keen.io
  stateChanged({type: 'APPLICATION_INIT'}, store.getState());
}

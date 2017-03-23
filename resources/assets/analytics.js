import {
  generateSessionid,
  isSessionValid,
  updateSession,
  getSession,
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
 * @param  {Object} state Application state
 * @return {Object}       Object to send
 */
function transformState(state) {
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
    meta: state.analytics,
  };

  return transformation;
}

/**
 * Transform the application state and push to Keen.io
 * Additionally bump the activity marker.
 *
 * @param  {Object} state Application state
 */
function stateChanged(state) {
  updateSession();
  const transformation = transformState(state);
  console.log(transformation);
}

/**
 * Watch the given parameters for changes in there state
 * and record it to the appropiate service.
 *
 * @param  {Object} history Instance of React Router history
 * @param  {Object} store   Instance of a React Redux store
 */
export default function (history, store) {
  // Setup session
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
  store.subscribe(() => stateChanged(store.getState()));
  stateChanged(store.getState());
}

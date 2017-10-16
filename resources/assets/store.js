import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import merge from 'lodash/merge';
import { checkForSignup, fetchReportbacks, startQueue, getTotalSignups } from './actions';
import experimentsMiddleware from './middleware/experiments';
import experimentsApiMiddleware from './middleware/experimentsApi';
import { loadStorage } from './helpers/storage';

/**
 * Initial state for the Redux store. This is where we
 * set default values for when the application loads.
 *
 * @type {Object}
 */
const initialState = {
  blocks: {
    offset: 1,
  },
  campaign: {
    activityFeed: [],
  },
  reportbacks: {
    currentPage: 0,
    isFetching: false,
    total: 0,
    totalPages: 1,
    ids: [],
    entities: {},
    itemEntities: {},
  },
  submissions: {
    reportback: {},
    isFetching: false,
    isStoring: false,
    items: [],
    messaging: null,
  },
  signups: {
    data: [],
    thisCampaign: false,
    thisSession: false,
    isPending: false,
    total: 0,
    affiliateMessagingOptOut: false,
  },
  competitions: {
    data: [],
    thisCampaign: false,
    showConfirmation: false,
    isPending: false,
  },
  user: {
    id: null,
    role: null,
  },
  events: {
    queue: [],
  },
  notifications: {
    items: [],
  },
  experiments: {},
  modal: {
    modalType: null,
    contentfulId: null,
    shouldShowModal: false,
  },
  uploads: {},
  quiz: {},
  slideshow: {},
};

/**
 * Create a new instance of the Redux store using the given
 * reducers & preloaded state from the server.
 *
 * @param reducers
 * @param middleware
 * @param preloadedState
 * @returns {Store<S>}
 */
export function configureStore(reducers, middleware, preloadedState = {}) {
  // Log actions to the console in development & track state changes.
  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger'); // eslint-disable-line global-require
    middleware.push(createLogger({ collapsed: true }));
  }

  // Experiments middleware
  middleware.push(
    experimentsMiddleware,
    experimentsApiMiddleware,
  );

  // If React DevTools are available, use instrumented compose function.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

  // @TODO: Let's just merge all 3 states at once
  const transformedState = loadStorage(initialState, preloadedState);

  return createStore(
    combineReducers(reducers),
    merge(transformedState, preloadedState),
    composeEnhancers(applyMiddleware(...middleware)),
  );
}

/**
 * Dispatch any actions to lazy-load application state. This
 * is done exactly once on initial page load.
 *
 * @param {Store<S>} store
 */
export function initializeStore(store) {
  const state = store.getState();

  // If we don't already have a signup cached in local storage, check.
  if (! state.signups.data.includes(state.campaign.legacyCampaignId)) {
    store.dispatch(checkForSignup(state.campaign.legacyCampaignId));
  }

  // Check for total signups
  store.dispatch(getTotalSignups(state.campaign.legacyCampaignId));

  // Fetch the first page of reportbacks for the feed.
  store.dispatch(fetchReportbacks());

  // Start the event queue.
  store.dispatch(startQueue());
}

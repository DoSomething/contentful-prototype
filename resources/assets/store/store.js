import merge from 'lodash/merge';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { checkForSignup, fetchReportbacks, startQueue, getTotalSignups } from '../actions';
import { loadStorage } from '../helpers/storage';
import initialState from './initialState';
import customMiddlewares from './middlewares';

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

  // Collect Middlewares
  middleware.push(...customMiddlewares);

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

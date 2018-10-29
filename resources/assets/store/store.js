import merge from 'lodash/merge';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import initialState from './initialState';
import customMiddlewares from './middlewares';
import { loadStorage } from '../helpers/storage';
import { getUserId, isAuthenticated } from '../selectors/user';
import { checkForSignup, getCampaignSignups, startQueue } from '../actions';

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
  console.log('💁🏻‍♂️ Configuring Store');
  console.log('Initial State:', initialState);
  console.log('Preloaded State:', preloadedState);

  // Log actions to the console in development & track state changes.
  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger'); // eslint-disable-line global-require
    middleware.push(createLogger({ collapsed: true }));
  }

  // Collect Middlewares
  middleware.push(...customMiddlewares);

  // If React DevTools are available, use instrumented compose function.
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

  // @TODO: Let's just merge all 3 states at once
  const transformedState = loadStorage(initialState, preloadedState);

  console.log('Transformed State:', transformedState);

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

  console.log('🏁 Initializing Store');
  console.log(state);

  const campaignId = state.campaign.campaignId;
  const storedSignup = state.signups.data.includes(campaignId);

  console.log('Campaign ID:', campaignId);
  console.log('User has signup:', storedSignup);
  console.log('User is authenticated:', isAuthenticated(state));

  // Fetch user signup for current campaign if user is authenticated and we don't
  // already have signup cached in the store.
  if (campaignId && isAuthenticated(state) && !storedSignup) {
    console.log(
      `🚖 Dispatching getCampaignSignups() for camapign ID: ${campaignId}`,
    );
    store.dispatch(
      getCampaignSignups({ filter: { northstar_id: getUserId(state) } }),
    );

    console.log(
      `🚖 Dispatching checkForSignup() for camapign ID: ${campaignId}`,
    );
    store.dispatch(checkForSignup(state.campaign.legacyCampaignId));
  }

  // Start the event queue.
  store.dispatch(startQueue());
}

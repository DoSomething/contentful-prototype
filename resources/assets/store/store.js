import merge from 'lodash/merge';
import localforage from 'localforage';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import initialState from './initialState';
import customMiddlewares from './middlewares';
import { loadStorage } from '../helpers/storage';
import { queue, query } from '../helpers';
import { getCampaignSignups, startQueue } from '../actions';
import { isCampaignSignUpInState } from '../selectors/signup';
import { getUserId, isAuthenticated } from '../selectors/user';

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
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

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
  const campaignId = state.campaign.campaignId;

  // Fetch user signup for current campaign if user is authenticated and we don't
  // already have signup record in the state store.
  if (
    campaignId &&
    isAuthenticated(state) &&
    !isCampaignSignUpInState(state, campaignId)
  ) {
    store.dispatch(
      getCampaignSignups(campaignId, {
        filter: { northstar_id: getUserId(state) },
      }),
    );
  }

  // Dispatch and queued post-auth actions if available.
  if (isAuthenticated(state) && query('actionId')) {
    const actionId = decodeURIComponent(query('actionId'));

    localforage.getItem(actionId).then(action => {
      store.dispatch(action);

      // Remove any old queued post-auth actions from storage.
      localforage.keys().then(keys => {
        const actions = keys.filter(key => key.indexOf('auth:') !== -1);
        actions.forEach(key => localforage.removeItem(key));
      });
    });
  }

  // Start the event queue.
  store.dispatch(startQueue());
}

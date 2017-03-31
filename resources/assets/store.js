import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import merge from 'lodash/merge';
import { observerMiddleware } from './analytics';
import { loadStorage } from './storageHelpers';

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
    isFetching: false,
    page: 1,
    ids: [],
    entities: {},
    itemEntities: {},
  },
  submissions: {
    reportback: {},
    isFetching: false,
    isStoring: false,
    items: [],
  },
  signups: {
    data: [],
    thisCampaign: false,
    thisSession: false,
    pending: false,
  },
  user: {
    id: null,
  },
  share: {
    status: null,
  },
  events: {
    queue: [],
  }
};

/**
 * Create a new instance of the Redux store using the given
 * reducers & preloaded state from the server.
 *
 * @param reducers
 * @param preloadedState
 * @returns {Store<S>}
 */
export default function(reducers, preloadedState = {}) {
  const middleware = [thunk, observerMiddleware];

  // Log actions to the console in development & track state changes.
  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require(`redux-logger`);
    middleware.push(createLogger({collapsed: true}));
  }

  // If React DevTools are available, use instrumented compose function.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  //TODO: Let's just merge all 3 states at once
  const transformedState = loadStorage(initialState, preloadedState);

  return createStore(
    combineReducers(reducers),
    merge(transformedState, preloadedState),
    composeEnhancers(applyMiddleware(...middleware))
  );
};

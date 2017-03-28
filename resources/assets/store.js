import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import merge from 'lodash/merge';
import { observerMiddleware } from './analytics';

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
    isFetching: false,
    isStoring: false,
    data: [],
  },
  signups: {
    data: (localStorage.getItem('signups') || '').split(','),
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
};

export default function(reducers, preloadedState = {}) {
  const middleware = [thunk, observerMiddleware];

  // Log actions to the console in development & track state changes.
  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require(`redux-logger`);
    middleware.push(createLogger({collapsed: true}));
  }

  // If React DevTools are available, use instrumented compose function.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    combineReducers(reducers),
    merge(initialState, preloadedState),
    composeEnhancers(applyMiddleware(...middleware))
  );
};

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import merge from 'lodash/merge';

export default function(reducers, preloadedState = {}) {

  const initialReactionState = {};
  //TODO: When we do infinite scrolling we're going to need a way of updating this
  preloadedState.reportbacks.data.forEach((reportback) => {
    reportback.reportback_items.data.forEach((item) => {
      const currentUser = item.kudos.data[0] ? item.kudos.data[0].current_user : false;
      const userReaction = currentUser ? currentUser.reacted : false;
      const reacted = preloadedState.user.id !== null ? userReaction : false;

      initialReactionState[item.id] = {
        reacted,
        total: item.kudos.data[0] ? item.kudos.data[0].term.total : 0,
        id: currentUser ? currentUser.kudos_id : null,
      };
    });
  });

  const initialState = {
    campaign: {
      activityFeed: [],
    },
    reportbacks: {
      isFetching: false,
      data: [],
    },
    submissions: {
      isStoring: false,
      data: [],
    },
    blocks: {
      offset: 1,
    },
    user: {
      id: false,
    },
    reactions: {
      data: initialReactionState,
    },
  };

  // Log actions to the console in development.
  const middleware = [thunk];
  if (process.env.NODE_ENV === `development`) {
    const createLogger = require(`redux-logger`);
    middleware.push(createLogger());
  }

  // If React DevTools are available, use instrumented compose function.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    combineReducers(reducers),
    merge(initialState, preloadedState),
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );
};

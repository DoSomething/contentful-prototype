import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

export default function(reducers, preloadedState = {}) {
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
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );
};

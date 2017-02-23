import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

export default function(rootReducer, preloadedState = {}) {
  // Log actions to the console in development.
  const middleware = [thunk];
  if (process.env.NODE_ENV === `development`) {
    const createLogger = require(`redux-logger`);
    middleware.push(createLogger());
  }

  // If React DevTools are available, use instrumented compose function.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );
};

/* global window, document */

/*
 |--------------------------------------------------------------------------
 | Phoenix Next
 |--------------------------------------------------------------------------
 |
 | This is the main entry point of the client-side experience for viewing
 | campaigns on Phoenix Next. It's compiled using Webpack, and then loaded
 | in the site chrome.
 |
 */

// WHATWG Fetch Polyfill
import 'whatwg-fetch';

import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { ready } from './helpers';
import { configureStore } from './store';
import * as reducers from './reducers';

// Style Components
import './scss/base.scss';
import './scss/chrome.scss';
import './scss/container.scss';
import './scss/navigation.scss';
import './scss/fonts.scss';

// Elements
import App from './components/App';

// Things
import { init as navigationInit } from './helpers/navigation';
import { init as historyInit } from './history';
import { observerMiddleware } from './middleware/analytics';

// Configure store & history.
const history = historyInit();
const middleware = [thunk, routerMiddleware(history), observerMiddleware];
const store = configureStore({ ...reducers, routing: routerReducer }, middleware, window.STATE);

ready(() => {
  const appElement = document.getElementById('app');

  if (appElement) {
    ReactDom.render(<App store={store} history={history} />, appElement);
  }

  navigationInit();
});

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

import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';
import { configureStore } from './store/store';

// Browser polyfills
import './polyfills';

// Style Components
import './scss/base.scss';
import './scss/chrome.scss';
import './scss/container.scss';
import './scss/navigation.scss';
import './scss/placeholder.scss';
import './scss/fonts.scss';

// React Application
import App from './components/App';

// DOM Helpers
import { init as historyInit } from './history';
import { googleAnalyticsInit } from './helpers/analytics';
import { bindNavigationEvents } from './helpers/navigation';

// Configure store & history.
const history = historyInit();
const middleware = [thunk, routerMiddleware(history)];
const preloadedState = window.STATE || {};
const store = configureStore(
  { ...reducers, routing: routerReducer },
  middleware,
  { ...preloadedState, user: window.AUTH },
);

// Add event listeners for top-level navigation.
bindNavigationEvents();

// Add event listeners for GA.
googleAnalyticsInit(history);

// Render the application!
const appElement = document.getElementById('app');
if (appElement) {
  ReactDom.render(<App store={store} history={history} />, appElement);
}

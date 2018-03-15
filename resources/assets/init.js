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
import { configureStore } from './store/store';
import * as reducers from './reducers';

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
import { bindNavigationEvents } from './helpers/navigation';
import googleAnalytics from './helpers/googleAnalytics';

// Configure store & history.
const history = historyInit();
const middleware = [thunk, routerMiddleware(history)];
const store = configureStore({ ...reducers, routing: routerReducer }, middleware, window.STATE);

// Add event listeners for top-level navigation.
bindNavigationEvents();

// Add event listeners for GA.
googleAnalytics(history);

// Render the application!
const appElement = document.getElementById('app');
if (appElement) {
  ReactDom.render(<App store={store} history={history} />, appElement);
}

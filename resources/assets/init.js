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
import { ready } from './helpers';
import { configureStore } from './store';
import * as reducers from './reducers'
import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import observe from './middleware/analytics';

// WHATWG Fetch Polyfill
import 'whatwg-fetch';

// Style Components
import './scss/chrome.scss';
import './scss/construction.scss';
import './scss/container.scss';
import './scss/navigation.scss';

// Elements
import App from './components/App';

// Things
import { init as navigationInit } from './helpers/navigation';
import { init as historyInit } from './history';

// Configure store & history.
const store = configureStore({...reducers, routing: routerReducer}, window.STATE);
const history = historyInit(store);

ready(() => {
  const appElement = document.getElementById('app');

  if (appElement) {
    ReactDom.render(<App store={store} history={history} />, appElement);
  }

  navigationInit();
});

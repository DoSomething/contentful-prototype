/*
 |--------------------------------------------------------------------------
 | Phoenix Next
 |--------------------------------------------------------------------------
 |
 | This is the main entry point for the client-side experience on Phoenix
 | Next. It's compiled using Webpack, and then loaded in the site chrome.
 |
 */

import { ready } from './helpers';

// WHATWG Fetch Polyfill
import 'whatwg-fetch';

// Components
import './components/construction.scss';
import './components/container.scss';
import './components/header.scss';

import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux'
import ActionPortal from './containers/ActionPortal';
import rootReducer from './reducers'
import configureStore from './store';

// Make action available to demonstrate loading more reportbacks.
// @TODO: Expose this in the UI!
import { fetchReportbacks } from './actions';
window.actions = { fetchReportbacks };

ready(() => {
  const appContainer = document.getElementById('app');
  const store = configureStore(rootReducer, window.STATE);

  if (appContainer) {
    ReactDom.render(<Provider store={store}><ActionPortal /></Provider>, appContainer);
  }
});

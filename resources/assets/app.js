/*
 |--------------------------------------------------------------------------
 | Phoenix Next
 |--------------------------------------------------------------------------
 |
 | This is the main entry point for the client-side experience on Phoenix
 | Next. It's compiled using Webpack, and then loaded in the site chrome.
 |
 */

import React from 'react';
import ReactDom from 'react-dom';
import { ready } from './helpers';

// WHATWG Fetch Polyfill
import 'whatwg-fetch';

// Style Components
import './scss/chrome.scss';
import './scss/construction.scss';
import './scss/container.scss';
import './scss/header.scss';

// Containers
import App from './components/App';

// Navigation
import { init as navigationInit } from './helpers/navigation';

// Make action available to demonstrate loading more reportbacks.
// @TODO: Expose this in the UI!
import { fetchReportbacks } from './actions';
window.actions = { fetchReportbacks };

ready(() => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    ReactDom.render(<App />, appContainer);
  }

  navigationInit();
});

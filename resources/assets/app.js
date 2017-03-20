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

import { init } from '@dosomething/analytics';
init('track', true, {
  projectId: services.KEEN_PROJECT_ID,
  writeKey: services.KEEN_WRITE_KEY,
});

// Style Components
import './components/construction.scss';
import './components/container.scss';
import './components/header.scss';

// Containers
import App from './containers/App';

// Make action available to demonstrate loading more reportbacks.
// @TODO: Expose this in the UI!
import { fetchReportbacks } from './actions';
window.actions = { fetchReportbacks };

ready(() => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    ReactDom.render(<App />, appContainer);
  }
});

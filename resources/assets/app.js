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
//TODO: Only enable analytics on prod?
init('track', true, {
  projectId: '58cbf99954532c1f35f4331f',
  writeKey: '41DC144FFC06A1C67BFC66161D8FA59438709F211A477A873BE2A07C47D00763F3AA451B0D6F31CCE88EBB6101B723B2CDE1CDAE78A4358CF48768FAA40717A1718D97FB1338B4AA8DF2C82993B6F6749D4CE28197796C012406864974DC6105'
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

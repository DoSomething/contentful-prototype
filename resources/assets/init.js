/* global window, document */
/* eslint-disable import/order */

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
import renderEnvironmentBadge from 'environment-badge';

import * as reducers from './reducers';
import { configureStore } from './store/store';

// Browser polyfills
import './polyfills';

// Style Components
import './scss/base.scss';
import './scss/admin-dashboard.scss';
import './scss/chrome.scss';
import './scss/container.scss';
import './scss/flash-message.scss';
import './scss/placeholder.scss';
import './scss/fonts.scss';
import './scss/gallery-grid.scss';

// React Application(s)
import App from './components/App';
import NavApp from './components/NavApp';

// DOM Helpers
import { ready, debug } from './helpers';
import { init as historyInit } from './history';
import { bindTokenRefreshEvent } from './helpers/auth';
import { bindFlashMessageEvents } from './helpers/flash-message';
import { bindAdminDashboardEvents } from './helpers/admin-dashboard';
import { analyze, trackAnalyticsPageView } from './helpers/analytics';

ready(() => {
  // Enable Debug tools.
  debug();

  // Configure store & history.
  const history = historyInit();
  const middleware = [thunk];
  const preloadedState = window.STATE || {};
  const store = configureStore(reducers, middleware, {
    ...preloadedState,
    user: window.AUTH,
  });

  // Add periodic check that our token hasn't expired.
  bindTokenRefreshEvent();

  // If available, set User ID for Snowplow analytics.
  if (typeof window.snowplow === 'function' && window.AUTH.id) {
    const analyticsEvent = ['setUserId', window.AUTH.id];

    analyze('snowplow', analyticsEvent, payload => {
      window.snowplow(...payload);
    });
  }

  // Add page view event listeners for History interface changes.
  trackAnalyticsPageView(history);

  // Add event listeners for the Flash Message.
  bindFlashMessageEvents();

  // Display environment badge on local, dev, or QA:
  renderEnvironmentBadge();

  // Add event listeners for the Admin Dashboard.
  if (window.AUTH.isAuthenticated && window.AUTH.role !== 'user') {
    bindAdminDashboardEvents();
  }

  // Render the application!
  const appElement = document.getElementById('app');
  if (appElement) {
    ReactDom.render(<App store={store} history={history} />, appElement);
  }

  // Render the nav on PHP rendered pages!
  const navAppElement = document.getElementById('nav-container');
  if (navAppElement) {
    ReactDom.render(<NavApp store={store} history={history} />, navAppElement);
  }
});

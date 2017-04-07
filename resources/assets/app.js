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
import './scss/construction.scss';
import './scss/container.scss';
import './scss/header.scss';

// Containers
import App from './components/App';

// Make action available to demonstrate loading more reportbacks.
// @TODO: Expose this in the UI!
import { fetchReportbacks } from './actions';
window.actions = { fetchReportbacks };

function toggleHandler(button, target, toggleClass) {
  if (!button || !target) return;

  function clickHandler() {
    target.classList.toggle(toggleClass);
  }

  button.addEventListener('touchstart', clickHandler, false);
  button.addEventListener('mousedown', clickHandler, false);
}

ready(() => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    ReactDom.render(<App />, appContainer);
  }

  const navToggle = document.getElementById('js-navigation-toggle');
  const nav = document.getElementsByClassName('navigation')[0];
  const chrome = document.getElementsByClassName('chrome')[0];
  toggleHandler(navToggle, nav, 'is-visible');
  toggleHandler(navToggle, chrome, 'has-mobile-menu');

  const accountToggle = document.getElementById('js-account-toggle');
  const dropdown = document.getElementsByClassName('navigation__dropdown')[0];
  toggleHandler(accountToggle, dropdown, 'is-visible');
});

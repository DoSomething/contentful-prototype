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

// Components
import './components/construction.scss';
import './components/container.scss';
import './components/header.scss';
import Feed from './components/Feed';

import React from 'react';
import ReactDom from 'react-dom';

ready(() => {
  const appContainer = document.getElementById('app');

  if (appContainer) {
    ReactDom.render(<Feed state={window.STATE}/>, appContainer);
  }
});

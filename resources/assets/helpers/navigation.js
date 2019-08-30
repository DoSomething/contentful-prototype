/* global document */

import { snakeCase } from 'lodash';

import {
  getPageContext,
  getUtmContext,
  trackAnalyticsEvent,
} from './analytics';
import { toggleClassHandler } from '.';

/**
 * Handle collecting Navigation link data and triggering analytics event.
 *
 * @param {Object} link
 */
export function linkAnalyticsHandler(link) {
  link.addEventListener(
    'mousedown',
    event => {
      trackAnalyticsEvent({
        context: {
          ...getUtmContext(),
          ...getPageContext(),
          referrer: document.referrer,
          pathname: document.pathname,
        },
        metadata: {
          category: 'navigation',
          noun: snakeCase(event.target.textContent),
          target: 'link',
          verb: 'clicked',
        },
      });
    },
    false,
  );
}

/**
 * Handle collecting Navigation search form data and triggering analytics event.
 *
 * @param {Object} form
 */
export function searchAnalyticsHandler(form) {
  const context = {
    ...getUtmContext(),
    ...getPageContext(),
  };

  form.addEventListener(
    'mousedown',
    () => {
      trackAnalyticsEvent({
        context,
        metadata: {
          category: 'search',
          noun: 'search form',
          target: 'form',
          verb: 'clicked',
        },
      });
    },
    false,
  );

  form.addEventListener(
    'submit',
    () => {
      trackAnalyticsEvent({
        context,
        metadata: {
          category: 'search',
          noun: 'search form',
          target: 'form',
          verb: 'submitted',
        },
      });
    },
    false,
  );
}

/**
 * Setup event listeners for the top-level navigation
 * in the site chrome.
 */
export function bindNavigationEvents() {
  // Small screen navigation menu toggle.
  const navToggle = document.getElementById('js-navigation-toggle');
  const nav = document.getElementsByClassName('navigation')[0];
  const chrome = document.getElementsByClassName('chrome')[0];

  toggleClassHandler(navToggle, nav, 'is-visible');
  toggleClassHandler(navToggle, chrome, 'has-mobile-menu');

  // Account profile dropdown toggle.
  const accountToggle = document.getElementById('js-account-toggle');
  const dropdown = document.getElementsByClassName('navigation__dropdown')[0];

  toggleClassHandler(accountToggle, dropdown, 'is-visible');

  // Navigation link analytics.
  const navLinks = document.querySelectorAll('.navigation__menu a');

  navLinks.forEach(link => {
    linkAnalyticsHandler(link);
  });

  // Search form analytics.
  const searchForm = document.querySelector('.navigation__menu .form-search');

  searchAnalyticsHandler(searchForm);
}

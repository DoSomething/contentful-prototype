/* global document */

import { findKey } from 'lodash';

import { toggleClassHandler } from '.';
import { trackAnalyticsEvent } from './analytics';

export const campaignPaths = {
  community: '/community',
  action: '/action',
  blocks: '/blocks/',
  quiz: '/quiz/',
};

/**
 * Get the display name of the given route,
 *
 * @param  {String} route
 * @return {String}
 */
export function getRouteName(route) {
  // When doing path comparisons, we want the least specific
  // (eg: '/') paths at the end of the array.
  const pathValues = Object.values(campaignPaths).sort(
    (pathA, pathB) => pathB.length - pathA.length,
  );

  // Check if /pages/faq starts with /pages/.
  const match = pathValues.find(path => route.startsWith(path));
  if (!match) {
    return 'undefined route';
  }

  // Find the display name for the matched path value.
  // This is a bit crazy because we need to find the index
  // in the `campaignPaths` object and the `pathValues` array is in
  // a different order.
  let name = findKey(campaignPaths, path => path === match);
  if (name === 'pages') {
    // Remove /pages/ from /pages/faq
    // Not the most fullproof solution in the world but should suffice.
    name = route.replace(match, '');
  }

  return name;
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
    link.addEventListener(
      'click',
      function(event) {
        event.preventDefault();
        console.log('### Event:', event);

        trackAnalyticsEvent({
          context: {},
          metadata: {
            adjective: '',
            category: '',
            label: '',
            noun: '',
            target: '',
            verb: 'clicked',
          },
        });
      },
      false,
    );
  });

  console.log('@@', navLinks);
}

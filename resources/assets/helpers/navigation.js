/* global document */

export const paths = {
  community: '/',
  action: '/action',
  pages: '/pages/',
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
  const pathValues = Object.values(paths).sort((a, b) => b.length - a.length);

  // Check if /pages/faq starts with /pages/.
  const match = pathValues.find(path => route.startsWith(path));
  if (! match) return 'undefined route';

  // Find the display name for the matched path value.
  let name = Object.keys(paths)[Object.values(paths).findIndex(path => path === match)];
  if (name === 'pages') {
    // Remove /pages/ from /pages/faq
    // Not the most fullproof solution in the world but should suffice.
    name = route.replace(match, '');
  }

  return name;
}

/**
 * Toggle the specified class on the given target element
 * when the button element is clicked or touched.
 *
 * @param  {Element} button
 * @param  {Element} target
 * @param  {String} toggleClass
 */
export function toggleHandler(button, target, toggleClass) {
  if (! button || ! target) return;

  function clickHandler() {
    target.classList.toggle(toggleClass);
  }

  button.addEventListener('mousedown', clickHandler, false);
}

/**
 * Setup event listeners for the nav bar
 */
export function init() {
  const navToggle = document.getElementById('js-navigation-toggle');
  const nav = document.getElementsByClassName('navigation')[0];
  const chrome = document.getElementsByClassName('chrome')[0];
  toggleHandler(navToggle, nav, 'is-visible');
  toggleHandler(navToggle, chrome, 'has-mobile-menu');

  const accountToggle = document.getElementById('js-account-toggle');
  const dropdown = document.getElementsByClassName('navigation__dropdown')[0];
  toggleHandler(accountToggle, dropdown, 'is-visible');
}

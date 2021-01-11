/* global document */

import { get, isString } from 'lodash';

import tailwindVariables from '../../../tailwind.variables';

// Helper Constants
export const EMPTY_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * Get a formatted name (small, medium, large)
 * of the current display size.
 *
 * @param  {int} width - Defaults to the screen width
 * @return {String}
 */
export function getFormattedScreenSize(screenWidth = window.innerWidth) {
  const breakpoints = [
    {
      name: 'small',
      test: width => width <= 759,
    },
    {
      name: 'medium',
      test: width => width >= 760 && width <= 959,
    },
    {
      name: 'large',
      test: width => width >= 960,
    },
  ];

  return breakpoints.find(breakpoint => breakpoint.test(screenWidth)).name;
}

/**
 * Prefix a class name or array of class names.
 * @param {String|Array} names
 */
export function modifiers(...names) {
  let classes = names;

  if (!Array.isArray(classes)) {
    classes = [classes];
  }

  return classes
    .filter(className => className)
    .map(className => `-${className}`);
}

/**
 * Open a dialog and run a callback when it closes.
 *
 * @param {String} href
 * @param {Function} callback
 * @param {Number} height
 * @param {Number} width
 */
export function openDialog(href, callback, width = 550, height = 420) {
  const winHeight = window.screen.height;
  const winWidth = window.screen.width;

  const left = Math.round(winWidth / 2 - width / 2);
  let top = 0;

  if (winHeight > height) {
    top = Math.round(winHeight / 2 - height / 2);
  }

  const dialog = window.open(
    href,
    'intent',
    `scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=${width},height=${height},left=${left},top=${top}`,
  );

  let interval;

  const check = () => {
    if (dialog.closed) {
      clearInterval(interval);
      callback();
    }
  };

  if (callback) {
    interval = setInterval(check, 1000);
  }
}

/**
 * Wait until the DOM is ready.
 *
 * @param {Function} fn
 */
export function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * Get specified theme setting from the resolved Tailwind configuration object.
 *
 * @param {String} themeSetting
 */
export function tailwind(themeSetting) {
  if (!isString(themeSetting)) {
    throw new Error(
      'Please specify a theme setting as a string to retrieve from Tailwind.',
    );
  }

  const setting = get(tailwindVariables, themeSetting, null);

  if (!setting) {
    console.error(
      `The ${themeSetting} setting specified was not found in the Tailwind theme configuration.`,
    );
  }

  return setting;
}

/**
 * Toggle the specified class on the given target element
 * when the button element is clicked or touched.
 *
 * @param  {Element} button
 * @param  {Element} target
 * @param  {String} toggleClass
 */
export function toggleClassHandler(button, target, toggleClass) {
  if (!button || !target) {
    return;
  }

  function clickHandler() {
    target.classList.toggle(toggleClass);
  }

  button.addEventListener('mousedown', clickHandler, false);
}

export default null;

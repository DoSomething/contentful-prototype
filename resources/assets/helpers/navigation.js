/**
 * Toggle the specified class on the given target element
 * when the button element is clicked or touched.
 *
 * @param  {Element} button
 * @param  {Element} target
 * @param  {String} toggleClass
 */
export function toggleHandler(button, target, toggleClass) {
  if (!button || !target) return;

  function clickHandler() {
    target.classList.toggle(toggleClass);
  }

  // button.addEventListener('touchstart', clickHandler, false);
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

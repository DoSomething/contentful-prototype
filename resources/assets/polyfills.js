/* global window */

// `window.location.origin` polyfill for IE 10
// @see: http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/
if (!window.location.origin) {
  const { protocol, hostname, port } = window.location;
  window.location.origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
}

// `console.group` shims, needed for debugging in IE 10
if (!console.groupCollapsed) {
  console.group = console.log;
  console.groupCollapsed = console.log;
  console.groupEnd = console.log;
}

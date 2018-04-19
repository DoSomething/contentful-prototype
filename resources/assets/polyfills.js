/* global window */

// Babel polyfill (Promise, Object.assign, etc.)
// @see: https://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

// `fetch()` polyfill (http://caniuse.com/#feat=fetch)
import 'unfetch';

// URL constructor polyfill (http://caniuse.com/#feat=url)
// @see: https://github.com/webcomponents/URL
import '@publica/url-polyfill';

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

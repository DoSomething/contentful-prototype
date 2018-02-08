/* global window, document, Blob, FB, URL, URLSearchParams */

import get from 'lodash/get';
import MarkdownIt from 'markdown-it';
import { isPast, parse } from 'date-fns';
import iterator from 'markdown-it-for-inline';
import markdownItFootnote from 'markdown-it-footnote';

// Helper Constants
export const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Internal Helper Functions
const isExternal = url => (
  new URL(url, window.location.origin).hostname !== window.location.hostname
);

/**
 * Generate a Contentful Image URL with added url parameters.
 *
 * @param  {String} url
 * @param  {String} width
 * @param  {String} height
 * @param  {String} fit
 * @return {String}
 */
export function contentfulImageUrl(url, width = null, height = null, fit = null) {
  const params = [];

  if (width) {
    params.push(`w=${width}`);
  }

  if (height) {
    params.push(`h=${height}`);
  }

  if (fit) {
    params.push(`fit=${fit}`);
  }

  return params.length ? `${url}?${params.join('&')}` : url;
}

/**
 * Return a string with tokens replaced by specified values.
 *
 * @param  {String} string
 * @param  {Object} tokens
 * @return {String}
 */
export function dynamicString(string, tokens = {}) {
  let updatedString = string;

  Object.keys(tokens).forEach((key) => {
    const regex = new RegExp(`{${key}}`, 'g');

    updatedString = updatedString.replace(regex, tokens[key]);
  });

  return updatedString;
}

/**
 * Ensure a user is authenticated. If not, redirect them
 * to log in via the OpenID Connect flow.
 * @param isAuthenticated
 * @returns {boolean}
 */
export function ensureAuth(isAuthenticated) {
  if (! isAuthenticated) {
    window.location.href = '/next/login';
    return false;
  }

  return true;
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
 * Render Markdown for a React component.
 *
 * @param {String} source - Markdown source
 * @returns {{__html}} - Prepared object for React's dangerouslySetInnerHtml
 */
export function markdown(source = '') {
  const markdownIt = new MarkdownIt();
  markdownIt.use(markdownItFootnote);

  markdownIt.use(iterator, 'url_new_win', 'link_open', (tokens, index) => {
    const token = tokens[index];
    const hrefIndex = token.attrIndex('href');
    const url = token.attrs[hrefIndex][1];

    if (isExternal(url)) {
      token.attrPush(['target', '_blank']);
    }
  });

  return {
    __html: markdownIt.render(source),
  };
}

/**
 * Prefix a class name or array of class names.
 * @param {String|Array} names
 */
export function modifiers(...names) {
  let classes = names;

  if (! Array.isArray(classes)) {
    classes = [classes];
  }

  return classes.filter(className => className).map(className => `-${className}`);
}

/**
 * Pluralize a noun.
 *
 * @param {Number} quantity
 * @param {String} singular
 * @param {String} plural
 */
export function pluralize(quantity, singular, plural) {
  return quantity === 1 ? singular : plural;
}

/**
 * Get the type for a specified file.
 *
 * @param  {ArrayBuffer} file
 * @return {String|null}
 * @todo Eventually deal with other file types.
 */
function getFileType(file) {
  const dv = new DataView(file, 0, 5);
  const byte1 = dv.getUint8(0, true);
  const byte2 = dv.getUint8(1, true);
  const hex = byte1.toString(16) + byte2.toString(16);

  return get({
    '8950': 'image/png', // eslint-disable-line quote-props
    '4749': 'image/gif', // eslint-disable-line quote-props
    '424d': 'image/bmp', // eslint-disable-line quote-props
    'ffd8': 'image/jpeg', // eslint-disable-line quote-props
  }, hex, null);
}

/**
 * Process file (provided as an ArrayBuffer) depending
 * on its type.
 *
 * @param  {ArrayBuffer} file
 * @return {Blob}
 * @todo Eventually deal with other file types.
 */
export function processFile(file) {
  const fileType = getFileType(file);
  const dataView = new DataView(file);

  if (fileType === 'image/png') {
    return new Blob([dataView], { type: fileType });
  }

  if (fileType === 'image/jpeg') {
    return new Blob([dataView], { type: 'image/jpeg' });
  }

  throw new Error('Unsupported file type.');
}

/**
 * Generate a random unique id based on the current time
 * and a random 5 digit number.
 *
 * @return {String}
 */
export function generateUniqueId() {
  const salt = Math.floor(Math.random() * 90000) + 10000;
  return `${Date.now()}${salt}`;
}

/**
 * Check if the given timestamp has exceeded its lifespan of max time.
 *
 * @param  {int}  timestamp    Timestamp in milliseconds.
 * @param  {int}  maxTime      Max life in milliseconds.
 * @return {Boolean}
 */
export function isTimestampValid(timestamp, maxTime) {
  return (timestamp + maxTime) > Date.now();
}

/**
 * Convert an int to a string. (Supports 0-10)
 * @param  {int} number
 * @return {String}
 */
export function convertNumberToWord(number) {
  switch (number) {
    case 0: return 'zero';
    case 1: return 'one';
    case 2: return 'two';
    case 3: return 'three';
    case 4: return 'four';
    case 5: return 'five';
    case 6: return 'six';
    case 7: return 'seven';
    case 8: return 'eight';
    case 9: return 'nine';
    case 10: return 'ten';
    default: throw new Error('Number out of range');
  }
}

/**
 * Make a hash from a specified string.
 * @see  http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 *
 * @param  {String} string
 * @return {String}
 */
export function makeHash(string) {
  if (string === undefined || string === null) {
    throw new Error('Cannot make hash from undefined or null value.');
  }

  let hash = 0;

  if (! string.length) {
    return hash;
  }

  string.split('').forEach((char, index) => {
    const charCode = string.charCodeAt(index);
    hash = ((hash << 5) - hash) + charCode; // eslint-disable-line no-bitwise
    hash = hash & hash; // eslint-disable-line no-bitwise, operator-assignment
  });

  return Math.abs(hash);
}

/**
 * Make a shareable link to a content item.
 *
 * @param  {String} type
 * @param  {Object} options
 * @param  {String} key  An id or a slug for the content.
 * @return {String}
 * @flow
 */
export function makeShareLink(
  resource,
  options: { domain: string, slug?: string, key: string, type: "blocks" | "modal" },
) {
  switch (resource) {
    case 'campaigns':
      return `${options.domain}/us/campaigns/${options.slug}/${options.type}/${options.key}`;

    default:
      throw new Error('Please provide an expected section type for generating the link.');
  }
}

/**
 * Get the days between two Date objects
 * @see  http://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates-using-javascript
 *
 * @param  {Date} dateOne
 * @param  {Date} dateTwo
 * @return {int}
 */
export function getDaysBetween(dateOne, dateTwo) {
  const oneDay = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs((dateOne.getTime() - dateTwo.getTime()) / oneDay));
}

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
      test: width => (width <= 759),
    },
    {
      name: 'medium',
      test: width => (width >= 760 && width <= 959),
    },
    {
      name: 'large',
      test: width => (width >= 960),
    },
  ];

  return breakpoints.find(breakpoint => breakpoint.test(screenWidth)).name;
}

/**
 * Check if the given campaign is closed.
 *
 * @param  {String}  endDate
 * @return {Boolean}
 */
export function isCampaignClosed(endDate) {
  if (! endDate) {
    return false;
  }

  return isPast(parse(endDate));
}

/**
 * Search an array of objects for the given id.
 *
 * @param  {Array}  array
 * @param  {String} compareId
 * @return {Object}
 */
export function findById(array, compareId) {
  return array.find(({ id }) => id === compareId);
}

/**
 * Get a value from the window.ENV
 *
 * @param  {String} key
 * @return {String}
 */
export function env(key) {
  return (window.ENV || {})[key];
}

/**
 * Share a link by generating a Facebook share prompt.
 * Get a callback if the share is successful or not.
 *
 * @param  {Object}   share
 * @param  {Function} callback
 */
export function showFacebookSharePrompt(share, callback) {
  const { href, quote } = share;

  FB.ui({
    method: 'share',
    href,
    quote,
  }, callback);
}

/**
 * Share a link by generating a Twitter intent share prompt.
 *
 * @param  {String} href
 * @param  {String} quote
 */
export function showTwitterSharePrompt(href, quote) {
  const width = 550;
  const height = 420;
  const winHeight = window.screen.height;
  const winWidth = window.screen.width;

  const left = Math.round((winWidth / 2) - (width / 2));
  let top = 0;

  if (winHeight > height) {
    top = Math.round((winHeight / 2) - (height / 2));
  }

  window.open(`https://twitter.com/intent/tweet?url=${href}&text=${quote}`, 'intent',
    `scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=${width},height=${height},left=${left},top=${top}`);
}

/**
 * Construct URL with query params
 *
 * @param {String} url
 * @param {object} query
 * @return {URL}
 */
export function makeUrl(path, queryParameters) {
  const urlObject = new URL(path);
  urlObject.search = new URLSearchParams(queryParameters);

  return urlObject;
}

/**
 * Get the query-string value at the given key.
 *
 * @param  {String}   key
 * @param  {URL|Location}   url
 * @return {String}
 */
export function query(key, url = window.location) {
  // Ensure we have a URL object from the location.
  const search = new URLSearchParams(url.search);

  return search.get(key);
}

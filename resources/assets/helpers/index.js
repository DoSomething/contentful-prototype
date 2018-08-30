/* global window, document, Blob, URL */

import { isBefore } from 'date-fns';
import MarkdownIt from 'markdown-it';
import queryString from 'query-string';
import iterator from 'markdown-it-for-inline';
import markdownItFootnote from 'markdown-it-footnote';
import { get, find, isNull, isUndefined, omitBy } from 'lodash';

import Sixpack from '../services/Sixpack';
import { trackPuckEvent } from './analytics';
import { isSignedUp } from '../selectors/signup';

// Helper Constants
export const EMPTY_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * Return a boolean indicating as to whether the provided URL is external to the site.
 *
 * @param  {String} url
 * @return {Boolean}
 */
export function isExternal(url) {
  return (
    new URL(String(url), window.location.origin).hostname !==
    window.location.hostname
  );
}

/**
 * Generate a Contentful Image URL with added url parameters.
 *
 * @param  {String} url
 * @param  {String} width
 * @param  {String} height
 * @param  {String} fit
 * @return {String}
 */
export function contentfulImageUrl(
  url,
  width = null,
  height = null,
  fit = null,
) {
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

  Object.keys(tokens).forEach(key => {
    const regex = new RegExp(`{${key}}`, 'g');

    updatedString = updatedString.replace(regex, tokens[key]);
  });

  return updatedString;
}

/**
 * Return a string with tokens removed.
 *
 * @param  {String} string
 * @param  {Object} tokens
 * @return {String}
 */
export function withoutTokens(string) {
  const regex = new RegExp(`{[A-Za-z]*}`, 'g');

  return string.replace(regex, 'x');
}

/**
 * Check to see if user is authenticated.
 *
 * @return {Boolean}
 */
export function isAuthenticated() {
  return get(window.AUTH, 'isAuthenticated', false);
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

  if (!Array.isArray(classes)) {
    classes = [classes];
  }

  return classes
    .filter(className => className)
    .map(className => `-${className}`);
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

  return get(
    {
      '8950': 'image/png',
      '4749': 'image/gif',
      '424d': 'image/bmp',
      ffd8: 'image/jpeg',
    },
    hex,
    null,
  );
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
  return timestamp + maxTime > Date.now();
}

/**
 * Convert an int to a string. (Supports 0-10)
 * @param  {int} number
 * @return {String}
 */
export function convertNumberToWord(number) {
  switch (number) {
    case 0:
      return 'zero';
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    case 9:
      return 'nine';
    case 10:
      return 'ten';
    default:
      throw new Error('Number out of range');
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

  if (!string.length) {
    return hash;
  }

  string.split('').forEach((char, index) => {
    const charCode = string.charCodeAt(index);
    hash = (hash << 5) - hash + charCode; // eslint-disable-line no-bitwise
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
  options: {
    domain: string,
    slug?: string,
    key: string,
    type: 'blocks' | 'modal',
  },
) {
  switch (resource) {
    case 'campaigns':
      return `${options.domain}/us/campaigns/${options.slug}/${options.type}/${
        options.key
      }`;

    default:
      throw new Error(
        'Please provide an expected section type for generating the link.',
      );
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
 * Check if the given campaign is closed.
 *
 * @param  {String}  endDate
 * @return {Boolean}
 */
export function isCampaignClosed(endDate) {
  if (!endDate) {
    return false;
  }

  return isBefore(endDate, new Date());
}

/**
 * Check if the Landing Page should be shown for campaign.
 *
 * @param  {Object}  state
 * @param  {Boolean} ignoreLandingPage - optional additional boolean to ignore landing page.
 * @return {Boolean}
 */
export function shouldShowLandingPage(state, ignoreLandingPage) {
  const hasLandingPage = state.campaign.landingPage !== null;

  const shouldIgnoreLandingPage =
    state.admin.shouldShowActionPage || ignoreLandingPage;
  let shouldShow = false;

  if (state.admin.shouldShowLandingPage) {
    shouldShow = true;
  } else if (hasLandingPage && !shouldIgnoreLandingPage) {
    shouldShow =
      !isSignedUp(state) &&
      !isCampaignClosed(get(state.campaign.endDate, 'date', null));
  }

  return shouldShow;
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
 * Construct URL with query params
 *
 * @param {String} url
 * @param {object} query
 * @return {URL}
 */
export function makeUrl(path, queryParameters) {
  const urlObject = new URL(String(path));
  urlObject.search = queryString.stringify(queryParameters);

  return urlObject;
}

/**
 * Get the query-string value at the given key.
 *
 * @param  {String}   key
 * @param  {URL|Location}   url
 * @return {String|Undefined}
 */
export function query(key, url = window.location) {
  // Ensure we have a URL object from the location.
  const search = queryString.parse(url.search);

  return search[key];
}

/**
 * Load and return the Facebook SDK.
 */
export function loadFacebookSDK() {
  return new Promise(resolve => {
    if (document.getElementById('facebook-jssdk')) {
      resolve(window.FB);
    }

    // Set init callback for once we've loaded Facebook's SDK:
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: env('FACEBOOK_APP_ID'),
        version: 'v2.8',
      });

      resolve(window.FB);
    };

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = '//connect.facebook.net/en_US/sdk.js';
    document.head.append(script);
  });
}

/**
 * Share a link by generating a Facebook dialog.
 * Get a callback if the share is successful or not.
 *
 * @param  {Object}  options
 * @return {Promise}
 */
export function showFacebookDialog(options) {
  return new Promise((resolve, reject) => {
    const handler = success => (success ? resolve() : reject());
    return window.FB.ui(options, handler);
  });
}

/**
 * Generate a Facebook Share Dialog
 *
 * @param {String} href
 * @param {String} quote
 */
export function showFacebookShareDialog(href, quote = null) {
  return showFacebookDialog({
    method: 'share',
    quote,
    href,
  });
}

/**
 * Generate a Facebook Send Dialog
 *
 * @param {String} href
 */
export function showFacebookSendDialog(href) {
  return showFacebookDialog({
    method: 'send',
    link: href,
  });
}

/**
 * Share a link via the Facebook Messenger app (for mobile devices).
 * Get a callback if the user is presumed to have been redirected to the
 * application or not.
 *
 * @param  {String}  href
 * @return {Promise}
 */
export function facebookMessengerShare(href) {
  // Capture if the user leaves the page (presumably meaning they've been successfully redirected to the Messenger app.)
  let switchedToApp = false;
  window.onblur = () => (switchedToApp = true);

  return new Promise((resolve, reject) => {
    const messengerAppUrl = makeUrl('fb-messenger://share', {
      link: href,
      app_id: env('FACEBOOK_APP_ID'),
    });
    window.location = messengerAppUrl.href;

    setTimeout(() => {
      // If our client still has not left the page, and the page is still in focus,
      // they presumably don't have the Messenger app.
      if (!switchedToApp && window.document.hasFocus()) {
        reject();
        // eslint-disable-next-line no-alert
        window.alert(
          'Sorry, you need to have the Facebook Messenger app installed, to send a message.',
        );
      } else {
        window.onblur = null;
        resolve();
      }
    }, 1500);
  });
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
 * Share a link by opening a Facebook share prompt.
 *
 * @param  {String} href
 * @param  {String} quote
 */
export function showFacebookSharePrompt(href, callback) {
  const intent = makeUrl('https://www.facebook.com/dialog/share', {
    app_id: env('FACEBOOK_APP_ID'),
    href,
  });

  openDialog(intent, callback);
}

/**
 * Share a link by opening a Twitter share prompt.
 *
 * @param  {String} href
 * @param  {String} quote
 */
export function showTwitterSharePrompt(href, quote = '', callback) {
  const intent = makeUrl('https://twitter.com/intent/tweet', {
    url: href,
    text: quote,
  });

  openDialog(intent, callback);
}

/**
 * Handle click event on from Facebook share button
 *
 * @param {String} href
 * @param {Object} trackingData
 */
export function handleFacebookShareClick(href, trackingData) {
  trackPuckEvent('clicked facebook share', trackingData);
  showFacebookSharePrompt(href);
}

/**
 * Handle click event from a Twitter share button
 *
 * @param {String} href
 * @param {Object} trackingData
 * @param {String} quote
 */
export function handleTwitterShareClick(href, trackingData, quote = '') {
  trackPuckEvent('clicked twitter share', trackingData);
  showTwitterSharePrompt(href, quote);
}

/**
 * Find an entry from within the campaign by given ID or Slug param.
 * (Returns false if not found).
 *
 * @param  {Object} state
 * @param  {String} identifier
 * @return {Object|Undefined}
 */
export function findContentfulEntry(state, identifier) {
  const campaign = state.campaign;

  const contentfulEntries = [].concat(campaign.pages, campaign.quizzes);

  return find(
    contentfulEntries,
    entry => entry.id === identifier || entry.fields.slug === identifier,
  );
}

/**
 * Get the content type of the given entry, including custom
 * overrides for "Custom Block" or "Campaign Action Step" or
 * manual re-assignments.
 *
 * @param  {Object} json
 * @param  {String} default
 * @return {String}
 */
export function parseContentfulType(json, defaultType) {
  // Figure out the "type" of this entry based on 'customType' field, Contentful machine name,
  // or the 'type' set in the API transformer. If none of those match, use the given default.
  return (
    get(json, 'fields.customType') ||
    get(json, 'type.sys.id') ||
    get(json, 'type') ||
    defaultType
  );
}

/**
 * Report a caught error to New Relic.
 *
 * @param {Error} error
 */
export function report(error) {
  if (!window.newrelic) {
    return;
  }

  window.newrelic.noticeError(error);
}

/*
 * Variable that stores single instance of Sixpack.
 */
let sixpackInstance = null;

/**
 * Get instance of Sixpack class.
 *
 * @return {Sixpack}
 */
export function sixpack() {
  if (!sixpackInstance) {
    sixpackInstance = new Sixpack();
  }

  return sixpackInstance;
}

/**
 * Remove items with null properties.
 * Helps with React defaultProps.
 *
 * @param  {Object} data
 * @return {Object}
 */
export function withoutNulls(data) {
  return omitBy(data, isNull);
}

/**
 * Remove items with undefined properties.
 *
 * @param  {Object} data
 * @return {Object}
 */
export function withoutUndefined(data) {
  return omitBy(data, isUndefined);
}

/**
 * Determine if a page is an 'Action' page.
 *
 * @param  {Object} dpage
 * @return {Boolean}
 */
export function isActionPage(page) {
  return page.type === 'page' && page.fields.slug.endsWith('action');
}

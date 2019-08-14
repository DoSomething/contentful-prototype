/* global window, document, Blob, URL */

import queryString from 'query-string';
import { getTime, isBefore, isWithinInterval } from 'date-fns';
import {
  get,
  find,
  isArray,
  isEmpty,
  isNil,
  isNull,
  isObjectLike,
  isUndefined,
  mapValues,
  merge,
  omitBy,
} from 'lodash';

import Debug from '../services/Debug';
import Sixpack from '../services/Sixpack';
import { isSignedUp } from '../selectors/signup';
import { trackAnalyticsEvent } from './analytics';
import { getDataForNorthstar } from '../selectors';

// Helper Constants
export const EMPTY_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * Append query parameters to a URL even if it already has existing parameters.
 *
 * @param  {Object} additionalParameters
 * @param  {String} href
 * @return {URL}
 */
export function appendToQuery(
  additionalParameters,
  href = window.location.href,
) {
  const urlObject = new URL(href);

  const mergedParameters = merge(
    queryString.parse(urlObject.search),
    additionalParameters,
  );

  urlObject.search = queryString.stringify(mergedParameters);

  return urlObject;
}

/**
 * Build login redirect URL with optional context data.
 *
 * @param  {Null|Object} options
 * @param  {Null|String} actionId
 * @return {String}
 */
export function buildLoginRedirectUrl(options = null, actionId = null) {
  const params = queryString.stringify({
    actionId,
    options: JSON.stringify(options),
  });

  return `${window.location.origin}/next/login?${params}`;
}

/**
 * Return a boolean indicating whether the provided URL is external to the site.
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
 * Return a boolean indicating whether the provided argument is an empty string.
 *
 * @param  {Mixed}  string
 * @return {Boolean}
 */
export function isEmptyString(string) {
  return string === '';
}

/**
 * Return a boolean indicating whether the provided argument is an empty array.
 *
 * @param  {Mixed}  data
 * @return {Boolean}
 */
export function isEmptyArray(data) {
  if (!isArray(data)) {
    return false;
  }

  return isEmpty(data);
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
  if (!url) {
    return undefined;
  }

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
 * Check to see if user is a DS.org staffer.
 *
 * @return {Boolean}
 */
export function isStaff() {
  const role = get(window.AUTH, 'role', 'user');

  return ['staff', 'admin'].includes(role);
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
      return `${options.domain}/us/campaigns/${options.slug}/${options.type}/${options.key}`;

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
 * Check if specified date occurred within the last specified minutes.
 *
 * @param  {Date|String|Number}  date
 * @param  {Number}  minutes
 * @return {Boolean}
 */
export function isWithinMinutes(date, minutes = 2) {
  if (!date) {
    return false;
  }

  return isWithinInterval(getTime(date), {
    start: Date.now() - minutes * 60 * 1000,
    end: Date.now(),
  });
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
      !isSignedUp(state) && !isCampaignClosed(state.campaign.endDate);
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
 * Construct absolute URL with query params.
 *
 * @param {String} url
 * @param {Object} query
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
          'Sorry, you need to have the Facebook Messenger app installed to send a message.',
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
 * Handle click event from Facebook share button
 *
 * @param {String} href
 * @param {Object} trackingData
 */
export function handleFacebookShareClick(href, trackingData) {
  trackAnalyticsEvent({
    context: { trackingData, url: href },
    metadata: {
      category: 'social_share',
      adjective: 'facebook',
      label: 'facebook',
      noun: 'share',
      target: 'button',
      verb: 'clicked',
    },
  });

  // @todo 12/13/2018: Use the showFacebookShareDialog to track
  // 'completed' and 'cancelled' events as well.
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
  trackAnalyticsEvent({
    context: { trackingData, url: href },
    metadata: {
      category: 'social_share',
      adjective: 'twitter',
      label: 'twitter',
      noun: 'share',
      target: 'button',
      verb: 'clicked',
    },
  });

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
    json.__typename ||
    get(json, 'fields.customType') ||
    get(json, 'type.sys.id') ||
    get(json, 'type') ||
    defaultType
  );
}

/**
 * Report a caught error to New Relic.
 *
 * @param {Error}  error
 * @param {Object} customAttributes
 */
export function report(error, customAttributes = null) {
  if (!window.newrelic) {
    return;
  }

  window.newrelic.noticeError(error, customAttributes);
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

let debugInstance = null;

export function debug() {
  if (!debugInstance) {
    debugInstance = new Debug();
  }

  return debugInstance;
}

/**
 * Stringify all properties on an object whose value is object with properties.
 *
 * @param  {Object} data
 * @return {Object}
 */
export function stringifyNestedObjects(data) {
  return mapValues(data, value => {
    if (isObjectLike(value)) {
      return JSON.stringify(value);
    }

    return value;
  });
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
 * Remove items from object with null, undefined, or empty string values.
 *
 * @param  {Object} data
 * @return {Object}
 */
export function withoutValueless(data) {
  return omitBy(omitBy(omitBy(data, isNil), isEmptyArray), isEmptyString);
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

/**
 * Get the Scholarship Affiliate Referrer's UTM Label.
 *
 * @return {String|Null}
 */
export function getScholarshipAffiliateLabel() {
  const utmSource = query('utm_source') || '';
  const utmCampaign = query('utm_campaign') || '';

  // The affiliate's UTM Label is expected to be the first value of a snake cased string.
  const utmLabel = utmCampaign.split('_')[0];

  // If the utm_source contains 'scholarship', we assume this visit to be a referral from a
  // scholarship affiliate and return the affiliate's UTM label.
  return utmSource.includes('scholarship') ? utmLabel : null;
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
  if (!button || !target) {
    return;
  }

  function clickHandler() {
    target.classList.toggle(toggleClass);
  }

  button.addEventListener('mousedown', clickHandler, false);
}

/**
 * Build redirect URL and send user to Northstar for authentication.
 *
 * @param  {Object} state
 * @return {Undefined}
 */
export function redirectToNorthstar(state) {
  window.location.href = buildLoginRedirectUrl(getDataForNorthstar(state));
}

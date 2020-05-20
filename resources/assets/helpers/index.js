/* global window, document, Blob, URL, snap */

import queryString from 'query-string';
import { format, getTime, isBefore, isWithinInterval } from 'date-fns';
import {
  get,
  find,
  isArray,
  isEmpty,
  isNil,
  isNull,
  isString,
  isObjectLike,
  isUndefined,
  mapValues,
  merge,
  mergeWith,
  omitBy,
} from 'lodash';

import Debug from '../services/Debug';
import Sixpack from '../services/Sixpack';
import tailwindVariables from '../../../tailwind.variables';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from './analytics';

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
  const urlObject = new URL(href, window.location.origin);

  const mergedParameters = merge(
    queryString.parse(urlObject.search),
    additionalParameters,
  );

  urlObject.search = queryString.stringify(mergedParameters);

  return urlObject;
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

  const params = withoutNulls({
    w: width, // eslint-disable-line id-length
    h: height, // eslint-disable-line id-length
    fit,
  });

  return Object.keys(params).length ? appendToQuery(params, url).href : url;
}

/**
 * Generate srcset value at specified sizes for a Contentful Image URL.
 *
 * @param {String} url
 * @param {Object} sizes
 */
export function contentfulImageSrcset(url, sizes) {
  const sources = sizes.map(size => {
    return `${contentfulImageUrl(url, size.width, size.height, 'fill')} ${
      size.width
    }w`;
  });

  return sources.join(', ');
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
 * @todo move to helpers/auth.js
 */
export function isAuthenticated() {
  return get(window.AUTH, 'isAuthenticated', false);
}

/**
 * Check to see if running in a development enviroment.
 *
 * @return {Boolean}
 */
export function isDevEnvironment() {
  return ['local', 'development'].includes(
    get(window.ENV, 'APP_ENV', 'production'),
  );
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
 * @param  {String} options.domain
 * @param  {String} options.slug
 * @param  {String} options.type
 * @param  {String} options.key  An id or a slug for the content.
 * @return {String}
 */
export function makeShareLink(resource, options = {}) {
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
 * Get a human friendly date from a Contentful Date (ISO 8601) string.
 *
 * @param {string} date
 * @return {string}
 */
export function getHumanFriendlyDate(date) {
  return format(date, 'MMMM do, yyyy');
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
export function env(key, defaultVal) {
  return get(window.ENV, key, defaultVal);
}

/**
 * Get feature flag value from window.ENV
 *
 * @param  {String} feature
 * @param  {*}      defaultVal
 * @return {*}
 */
export function featureFlag(feature, defaultVal) {
  return get(env('FEATURE_FLAGS'), feature, defaultVal);
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
 * Get referral campaign ID for refer-a-friend share URL.
 *
 * @return {string}
 */
export function getReferralCampaignId() {
  return query('campaign_id');
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
 * Load and return the Snapchat SDK.
 */
export function loadSnapchatSDK() {
  const script = document.createElement('script');
  script.id = 'snapkit-creative-kit-sdk';
  script.src = 'https://sdk.snapkit.com/js/v1/create.js';
  document.head.append(script);

  window.snapKitInit = function() {
    snap.creativekit.initalizeShareButtons(
      document.getElementsByClassName('snapchat-share-button'),
    );
  };
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
  trackAnalyticsEvent('clicked_share_facebook', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.socialShare,
    label: 'facebook',
    context: { ...trackingData, url: href },
  });

  // @todo 12/13/2018: Use the showFacebookShareDialog to track
  // 'completed' and 'cancelled' events as well.
  showFacebookSharePrompt(href);
}

/**
 * Handle click event from a Snapchat share button
 *
 * @param {String} href
 * @param {Object} trackingData
 *
 */
export function handleSnapchatShareClick(href, trackingData) {
  trackAnalyticsEvent('clicked_share_snapchat', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.socialShare,
    label: 'snapchat',
    context: { ...trackingData, url: href },
  });
}

/**
 * Handle click event from a Twitter share button
 *
 * @param {String} href
 * @param {Object} trackingData
 * @param {String} quote
 */
export function handleTwitterShareClick(href, trackingData, quote = '') {
  trackAnalyticsEvent('clicked_share_twitter', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.socialShare,
    label: 'twitter',
    context: { ...trackingData, url: href },
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
    entry =>
      entry.id === identifier || get(entry, 'fields.slug') === identifier,
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
 * @param {Error|string}  error
 * @param {Object} customAttributes
 */
export function report(error, customAttributes = null) {
  let errorInstance;

  // Print to the console for devs:
  console.error(`[report] ${error}`);

  // If we're not running New Relic here, don't report:
  if (!window.newrelic) {
    return;
  }

  // New Relic's 'noticeError' expects an Error instance:
  if (isString(error)) {
    errorInstance = new Error(error);
  }

  if (isNull(error)) {
    errorInstance = new Error('Unknown error');
  }

  window.newrelic.noticeError(errorInstance, customAttributes);
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
 * Determine if a page is an 'Action' page.
 *
 * @param  {Object} page
 * @return {Boolean}
 */
export function isActionPage(page) {
  return page.type === 'page' && page.fields.slug.endsWith('action');
}

/**
 * Determine if the user is a scholarship affiliate referral.
 *
 * @return {Boolean}
 */
export function isScholarshipAffiliateReferral() {
  const utmSource = query('utm_source');

  return utmSource && utmSource.includes('scholarship');
}

/**
 * Get the Scholarship Affiliate Referrer's UTM Label.
 *
 * @return {String|Null}
 */
export function getScholarshipAffiliateLabel() {
  const utmCampaign = query('utm_campaign') || '';

  // The affiliate's UTM Label is expected to be the first value of a snake cased string.
  const utmLabel = utmCampaign.split('_')[0];

  // If the utm_source contains 'scholarship', we assume this visit to be a referral from a
  // scholarship affiliate and return the affiliate's UTM label.
  return isScholarshipAffiliateReferral() ? utmLabel : null;
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

/**
 * Merge paginated GraphQL queries.
 *
 * @param {Object} previous
 * @param {Object} [fetchMoreResult]
 */
export function updateQuery(previous, { fetchMoreResult }) {
  return mergeWith({}, previous, fetchMoreResult, (dest, src) =>
    // By default, Lodash's `merge` would try to merge *each* array
    // item (e.g. `edges[0]` with then next page's `edges[0]`).
    isArray(dest) ? [...dest, ...src] : undefined,
  );
}

/**
 * Formula to convert time to milliseconds.
 *
 * @param {Number} days
 */
export function getMillisecondsFromDays(days) {
  // # of days * 1440 minutes in a day * 60 minutes * 1000 milliseconds
  // @TODO make this more flexible, ie. get milliseconds from hours vs days etc
  return days * 1440 * 60 * 1000;
}

/**
 * Build UTMs for Voter Registration URLs
 *
 * @param {String} referrerUserId
 * @param {String} sourceDetails
 */

export function getVoterRegistrationTrackingSource(
  sourceDetails,
  referrerUserId = '',
) {
  const userId = window.AUTH.id ? `${window.AUTH.id}` : '';

  if (referrerUserId || userId) {
    return referrerUserId
      ? `r=user:${referrerUserId},source:web,source_details:${sourceDetails},referral=true`
      : `r=user:${userId},source:web,source_details:${sourceDetails}`;
  }

  return `r=source:web,source_details:${sourceDetails}`;
}

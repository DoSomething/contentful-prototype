/* global window, Blob */

import { format, getTime, isWithinInterval } from 'date-fns';
import {
  get,
  isArray,
  isEmpty,
  isNil,
  isNull,
  isString,
  isObjectLike,
  isUndefined,
  mapValues,
  mergeWith,
  omitBy,
} from 'lodash';

import { query } from './url';
import Debug from '../services/Debug';
import Sixpack from '../services/Sixpack';

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

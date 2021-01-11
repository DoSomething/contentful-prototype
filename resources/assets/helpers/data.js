/* global Date, JSON, Math, Object */

import {
  isArray,
  isEmpty,
  isNil,
  isNull,
  isObjectLike,
  isUndefined,
  mapValues,
  omitBy,
} from 'lodash';

/**
 * Convert a number to a string. (Supports 0-10)
 * @param  {Number} number
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
 * Return a boolean indicating whether the provided argument is an empty array.
 *
 * @param  {*} data
 * @return {Boolean}
 */
export function isEmptyArray(data) {
  if (!isArray(data)) {
    return false;
  }

  return isEmpty(data);
}

/**
 * Return a boolean indicating whether the provided argument is an empty string.
 *
 * @param  {*} data
 * @return {Boolean}
 */
export function isEmptyString(data) {
  return data === '';
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

export default null;

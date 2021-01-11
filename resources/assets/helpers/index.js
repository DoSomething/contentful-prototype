/* global window */

import { format, getTime, isWithinInterval } from 'date-fns';
import { isArray, isNull, isString, mergeWith } from 'lodash';

import { query } from './url';
import Debug from '../services/Debug';

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

let debugInstance = null;

export function debug() {
  if (!debugInstance) {
    debugInstance = new Debug();
  }

  return debugInstance;
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

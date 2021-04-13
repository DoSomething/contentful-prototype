/* global Date, Math */

import { format } from 'date-fns';

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
 * Get a human friendly date from a Contentful Date (ISO 8601) string.
 *
 * @param {string} date
 * @return {string}
 */
export function getHumanFriendlyDate(date) {
  return format(date, 'MMMM do, yyyy');
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
 * Check if the given timestamp has exceeded its lifespan of max time.
 *
 * @param  {int}  timestamp    Timestamp in milliseconds.
 * @param  {int}  maxTime      Max life in milliseconds.
 * @return {Boolean}
 */
export function isTimestampValid(timestamp, maxTime) {
  return timestamp + maxTime > Date.now();
}

export default null;

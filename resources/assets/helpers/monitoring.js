/* global window */

import { isNull, isString } from 'lodash';

import Debug from '../services/Debug';

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

/**
 * Create single instance of the Debug class.
 */
let debugInstance = null;

export function debug() {
  if (!debugInstance) {
    debugInstance = new Debug();
  }

  return debugInstance;
}

export default null;

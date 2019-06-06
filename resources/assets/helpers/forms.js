/* global FormData, window */

import { forEach, get, isInteger } from 'lodash';

import { query, withoutNulls } from '.';

/**
 * Calculate the difference between a total value and a submitted value.
 * Returns submitted value if calculation cannot be completed.
 *
 * @param  {Number|String} total
 * @param  {Number|String} submittedValue
 * @return {Number|String}
 */
export function calculateDifference(total, submittedValue) {
  const validTotal = total && isInteger(Number(total));
  const validValue = submittedValue && isInteger(Number(submittedValue));

  if (!validTotal || !validValue) {
    return submittedValue;
  }

  return Number(submittedValue) - Number(total);
}

/**
 * Get the status error/success message for a form response.
 *
 * @param  {Object} response
 * @return {String}
 */
export function getStatusMessage(response) {
  const status = response.status.error || response.status.success;

  return status.message;
}

/**
 * Get the errors for all fields in a form response.
 *
 * @param  {Object} response
 * @return {Object|null}
 */
export function getFieldErrors(response) {
  return get(response, 'status.error.fields', null);
}

/**
 * Get all the error messages for each field in a form response.
 *
 * @param  {Object} response
 * @return {Array|null}
 */
export function getFieldErrorMessages(response) {
  const errorFields = getFieldErrors(response);

  if (!errorFields) {
    return null;
  }

  const messages = [];

  // Collect all error messages for every field
  Object.keys(errorFields).map(field =>
    errorFields[field].map(message => messages.push(message)),
  );

  return messages;
}

/**
 * Set form data for the provided data values.
 *
 * @param {Object} data
 * @return FormData
 */
export function createFormData(data = {}) {
  const formData = new FormData();

  forEach(data, (value, key) => formData.append(key, value));

  return formData;
}

/**
 * Extract all FormData entries into an Object.
 *
 * @param {FormData} formData
 * @return Object|Null
 */
export function getFormData(formData) {
  // Catch for browsers which don't support the entries method.
  if (!('entries' in FormData.prototype)) {
    return null;
  }

  const formDataObject = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const entry of formData.entries()) {
    formDataObject[entry[0]] = entry[1];
  }

  return formDataObject;
}

/**
 * Format and furnish RB post data.
 *
 * @param {Object} data
 * @param {Undefined|Object} data.details
 * @param {Undefined|String} data.type
 * @return FormData|Object
 */
export function formatPostPayload(data = {}) {
  let formattedData = data;

  // JSON serialize details field which gets validated as JSON.
  if (data.details) {
    formattedData.details = JSON.stringify(data.details);
  }

  // Attach 'source_details' based on referring page/block & UTMs:
  formattedData.source_details = JSON.stringify(
    withoutNulls({
      // @TODO: Pass in 'contentful_id' parameter here w/ the containing page ID.
      // contentful_id: contentfulId,
      utm_source: query('utm_source'),
      utm_medium: query('utm_medium'),
      utm_campaign: query('utm_campaign'),
    }),
  );

  // Attach location information, provided by Fastly.
  if (window.AUTH.location) {
    formattedData = { ...formattedData, location: window.AUTH.location };
  }

  // Photo RBs contain file uploads and thus need to be converted to a FormData object.
  if (data.type === 'photo') {
    formattedData = createFormData(formattedData);
  }

  return formattedData;
}

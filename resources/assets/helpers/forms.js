import { has } from 'lodash';

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
 * @return {Object}
 */
export function getFieldErrors(response) {
  if (! has(response, 'status.error.fields')) {
    return null;
  }

  return response.status.error.fields;
}

/**
 * Get all the error messages for each field in a form response.
 *
 * @param  {Object} response
 * @return {Array|null}
 */
export function getFieldErrorMessages(response) {
  const errorFields = getFieldErrors(response);

  if (! errorFields) {
    return null;
  }

  const messages = [];

  // Collect all error messages for every field
  Object.keys(errorFields).map(field => (
    errorFields[field].map(message => (messages.push(message)))
  ));

  return messages;
}

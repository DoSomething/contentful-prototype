import { has } from 'lodash';

export function getStatusMessage(response) {
  const status = response.status.error || response.status.success;

  return status.message;
}

export function getFieldErrorMessages(response) {
  if (! has(response, 'status.error.fields')) {
    return null;
  }

  console.log(response.status.error.fields);

  const errorFields = response.status.error.fields;

  let messages = [];

  // Collect all error messages for every field
  Object.keys(errorFields).map(field => (
    errorFields[field].map(message => (messages.push(message)))
  ));

  return messages;
}

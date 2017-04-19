/* global document, location, localStorage */

import { analyze } from '@dosomething/analytics';
import { generateUniqueId, isTimestampValid } from '../helpers';

const DEVICE_ID = 'DEVICE_ID';
const SESSION_ID = 'SESSION_ID';
const SESSION_LAST_UPDATED_AT = 'SESSION_LAST_UPDATED_AT';

export function getSession() {
  return {
    id: localStorage.getItem(SESSION_ID),
    lastUpdatedAt: localStorage.getItem(SESSION_LAST_UPDATED_AT),
    deviceId: localStorage.getItem(DEVICE_ID),
  };
}

/**
 * Prepare the state for being sent to Keen.io
 *
 * @param  {Object} action Action that fired
 * @param  {Object} state  Application state
 * @return {Object}        Object to send
 */
export function transformState(action, state) {
  const transformation = {
    feed: {
      page: state.blocks.offset,
    },
    campaign: state.campaign,
    page: {
      host: location.hostname,
      path: location.pathname,
      referer: document.referrer,
    },
    signups: state.signups,
    submissions: state.submissions,
    user: {
      session: getSession(),
      ...state.user,
    },
    action,
  };

  return transformation;
}

/**
 * Check if this device has a unique id,
 * if not then create one.
 */
export function createDeviceId() {
  if (localStorage.getItem(DEVICE_ID)) return;

  localStorage.setItem(DEVICE_ID, generateUniqueId());
}

/**
 * Get the unique identifier of this device.
 * If it doesn't have one, create it.
 *
 * @return {String}
 */
export function getDeviceId() {
  const id = localStorage.getItem(DEVICE_ID);
  if (id) return id;

  createDeviceId();
  return getDeviceId();
}

/**
 * Update the session to reflect the user is still active.
 */
export function updateSession() {
  localStorage.setItem(SESSION_LAST_UPDATED_AT, Date.now());
}

/**
 * Generate a new session id.
 */
export function generateSessionid() {
  localStorage.setItem(SESSION_ID, generateUniqueId());
  updateSession();
}

/**
 * Check if the given session id is still valid.
 *
 * @return {Boolean}
 */
export function isSessionValid() {
  const session = getSession();

  if (! session.id || ! session.lastUpdatedAt) return false;

  // Check if the timestamp is 15 min old
  return isTimestampValid(session.lastUpdatedAt, (15 * 60 * 1000));
}

/**
 * Transform the application state and push to Keen.io
 * Additionally bump the activity marker.
 *
 * @param  {Object} action Action that fired
 * @param  {Object} state  Application state
 */
export function stateChanged(action, state) {
  updateSession();
  const transformation = transformState(action, state);

  analyze('action', transformation);
}

/**
 * Merge analytics default & custom metadata together.
 *
 * @param  {Object} defaults
 * @param  {Object} properties
 * @return {Object}
 */
export function mergeMetadata(defaults, properties) {
  return Object.assign(defaults, properties);
}

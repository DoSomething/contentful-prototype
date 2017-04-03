import { generateUniqueId } from '../helpers';

const DEVICE_ID = 'DEVICE_ID';
const SESSION_ID = 'SESSION_ID';
const SESSION_LAST_UPDATED_AT = 'SESSION_LAST_UPDATED_AT';

/**
 * Check if this device has a unique id,
 * if not then create one.
 */
export function createDeviceId() {
  if (localStorage.getItem(DEVICE_ID)) return;

  localStorage.setItem(DEVICE_ID, generateUniqueId());
}

export function getSession() {
  return {
    id: localStorage.getItem(SESSION_ID),
    lastUpdatedAt: localStorage.getItem(SESSION_LAST_UPDATED_AT),
    deviceId: localStorage.getItem(DEVICE_ID),
  };
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

  if (!session.id || !session.lastUpdatedAt) return false;

  // Check if the timestamp is 15 min old
  return (session.lastUpdatedAt + (15 * 60 * 1000)) > Date.now();
}

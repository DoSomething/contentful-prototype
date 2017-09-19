/* global localStorage */

export const SIGNUP_STORAGE_KEY = 'signups';
export const COMPETITION_STORAGE_KEY = 'competitions';
export const EVENT_STORAGE_KEY = 'events';
export const QUIZ_STORAGE_KEY = 'quiz';

function key(id, type) {
  return `${id}-${type}`;
}

/**
 * Set data in local storage for the given
 * unique id and data type.
 *
 * @param {string} id   Unique id
 * @param {string} type Data type
 * @param {mixed}  data Data to write
 */
export function set(id, type, data) {
  localStorage.setItem(key(id, type), JSON.stringify(data));
}

/**
 * Get data in local storage for the given
 * unique id and data type.
 *
 * @param  {string} id   Unique id
 * @param  {string} type Data type
 * @return {mixed}       Data saved in local storage
 */
export function get(id, type) {
  return JSON.parse(localStorage.getItem(key(id, type)) || null);
}

/**
 * Delete data in local storage for the given
 * unique id and data type.
 *
 * @param {string} id   Unique id
 * @param {string} type Data type
 */
export function remove(id, type) {
  localStorage.removeItem(key(id, type));
}

/**
 * Get the array in local storage for the given
 * unique id and data type or an empty array.
 *
 * @param  {string} id   Unique id
 * @param  {string} type Data type
 * @return {array}
 */
export function getArray(id, type) {
  return get(id, type) || [];
}

/**
 * Append data to an array in local storage
 * for the given unique id and data type.
 *
 * @param {string} id   Unique id
 * @param {string} type Data type
 * @param {mixed}  data Data to write
 */
export function append(id, type, data) {
  const array = getArray(id, type);
  array.push(data);
  set(id, type, array);
}

/**
 * Remove a specific index from an array
 * in local storage for the given unique
 * id and data type.
 *
 * @param  {string} id    Unique id
 * @param  {string} type  Data type
 * @param  {int}    index Index to delete
 */
export function splice(id, type, index) {
  const array = getArray(id, type);
  array.splice(index, 1);
  set(id, type, array);
}

/**
 * Load the state that was last written to storage.
 *
 * @param  {object} initialState   The barebones default state.
 * @param  {object} preloadedState The state values passed from the server.
 * @return {object}                The new initial state
 */
export function loadStorage(initialState, preloadedState) {
  const state = initialState;

  const userId = preloadedState.user.id;
  if (userId) {
    const signups = getArray(userId, SIGNUP_STORAGE_KEY);
    state.signups.data = signups;

    if (signups.includes(preloadedState.campaign.legacyCampaignId)) {
      state.signups.thisCampaign = true;
    }

    const competitions = getArray(userId, COMPETITION_STORAGE_KEY);
    state.competitions.data = competitions;

    if (competitions.includes(preloadedState.campaign.legacyCampaignId)) {
      state.competitions.thisCampaign = true;
    }
  }

  state.events.queue = getArray('queue', EVENT_STORAGE_KEY);

  return state;
}

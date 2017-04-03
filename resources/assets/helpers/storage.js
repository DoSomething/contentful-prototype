export const SIGNUP_STORAGE_KEY = 'signups';

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
 * Append data to an array in local storage
 * for the given unique id and data type.
 *
 * @param {string} id   Unique id
 * @param {string} type Data type
 * @param {mixed}  data Data to write
 */
export function append(id, type, data) {
  const array = get(id, type) || [];
  array.push(data);
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
  const userId = preloadedState.user.id;
  if (! userId) return;

  initialState.signups.data = get(userId, SIGNUP_STORAGE_KEY) || [];

  return initialState;
}

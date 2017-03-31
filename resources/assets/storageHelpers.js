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

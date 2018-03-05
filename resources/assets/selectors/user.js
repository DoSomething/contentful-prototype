/**
 * Get the user id from the state.
 *
 * @param state
 * @returns {String}
 */
export function isAuthenticated(state) {
  return state.user.isAuthenticated;
}

/**
 * Get the user id from the state.
 *
 * @param state
 * @returns {String}
 */
export function getUserId(state) {
  return state.user.id;
}

/**
 * Find out if the user had one of provided roles.
 *
 * @param {object} state
 * @param {array}  roles
 * @returns {boolean}
 */
export function userHasRole(state, roles) {
  return roles.includes(state.user.role);
}

/**
 * Get the user id from the state.
 *
 * @param  {Object} state
 * @return {Bool}
 */
export function isAuthenticated(state) {
  return state.user.isAuthenticated;
}

/**
 * Get the user id from the state.
 *
 * @param  {Object} state
 * @return {String}
 */
export function getUserId(state) {
  return state.user.id;
}

/**
 * Get the user token from the state.
 *
 * @param  {Object} state
 * @return {String}
 */
export function getUserToken(state) {
  return state.user.token;
}

/**
 * Find out if the user had one of provided roles.
 *
 * @param  {Object} state
 * @param  {Array}  roles
 * @return {Boolean}
 */
export function userHasRole(state, roles) {
  return roles.includes(state.user.role);
}

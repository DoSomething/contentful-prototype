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

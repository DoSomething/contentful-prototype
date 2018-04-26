/**
 * Is the user signed up for this campaign?
 *
 * @param state
 * @returns {String}
 */
export function isSignedUp(state) {
  return state.signups.thisCampaign;
}

export default null;

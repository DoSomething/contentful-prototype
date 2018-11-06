/**
 * Is the user signed up for this campaign?
 *
 * @param   {Object} state
 * @returns {String}
 * @deprecated
 * @todo    Would prefer to have isSignedUp be a helper function that first checks
 * isCampaignSignUpInState() and next does API call to Rogue for signup, etc.
 * In practice this only checks state and can be confusing if user is signed up,
 * but the state has not had time to reflect that...
 */
export function isSignedUp(state) {
  const campaignId = state.campaign.campaignId;

  return state.signups.data.includes(campaignId);
}

/**
 * Check if there is a signup record in state for the specified or current campaign.
 *
 * @param   {Object} state
 * @param   {Null|String} campaignId
 * @returns {String}
 */
export function isCampaignSignUpInState(state, campaignId = null) {
  const id = campaignId || state.campaign.campaignId;

  return state.signups.data.includes(id);
}

export default null;

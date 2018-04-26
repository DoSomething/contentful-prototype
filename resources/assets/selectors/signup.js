/**
 * Is the user signed up for this campaign?
 *
 * @param state
 * @returns {String}
 */
export function isSignedUp(state) {
  const campaignId = state.campaign.legacyCampaignId;

  return state.signups.data.includes(campaignId);
}

export default null;

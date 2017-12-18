import apiRequest from './api';

/**
 * Fetch posts for the specified campaign.
 *
 * @return {function}
 */
export function fetchCampaignPosts() {
  return (dispatch, getState) => {
    const id = getState().campaign.id;
    const legacyId = getState().campaign.legacyCampaignId;
    // @TODO: for now prefer legacy ID over contentful ID
    const campaignId = legacyId || id;

    dispatch(apiRequest('GET', {
      id,
      legacyId,
      query: {
        limit: 24,
      },
      url: `api/v1/campaigns/${campaignId}/posts`,
    }));
  };
}

export default {};

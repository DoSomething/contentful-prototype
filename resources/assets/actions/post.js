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
      url: `api/v2/campaigns/${campaignId}/posts`,
    }));
  };
}

/**
 * Store posts for the specified campaign.
 *
 * @param  {Object} data
 * @return {function}
 */
export function storeCampaignPost(data) {
  return (dispatch, getState) => {
    console.log('🤖 beep boop storing campaign post...');
    // console.log(getState().campaign.id);
    // console.log(data);

    dispatch(apiRequest('POST', {
      body: {
        textValue: data.textValue,
      },
      url: `api/v2/campaigns/${data.campaignId}/post`,
    }));
  };
}

/* global window */

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
      url: `${window.location.origin}/api/v2/campaigns/${campaignId}/posts`,
    }));
  };
}

/**
 * Store posts for the specified campaign.
 *
 * @param  {FormData} data
 * @return {function}
 */
export function storeCampaignPost(data) {
  if (! (data instanceof FormData)) {
    throw Error(`The supplied data must be an instance of FormData, instead it is an instance of ${data.constructor.name}.`);
  }

  return (dispatch, getState) => {
    const token = getState().user.token;

    dispatch(apiRequest('POST', {
      token,
      body: data,
      url: `${window.location.origin}/api/v2/campaigns/${data.get('campaignId')}/posts`,
    }));
  };
}

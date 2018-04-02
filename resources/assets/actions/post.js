/* global window FormData */

import apiRequest from './api';
import {
  POST_SUBMISSION_PENDING,
  POST_SUBMISSION_FAILED,
  POST_SUBMISSION_SUCCESSFUL,
} from '../constants/action-types';

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
 * @param {String} campaignId
 * @param  {Object} data
 * @return {function}
 */
export function storeCampaignPost(campaignId, data) {
  if (! (data.body instanceof FormData)) {
    throw Error(`The supplied data.body must be an instance of FormData, instead it is an instance of ${data.body.constructor.name}.`);
  }

  const { body, id, type } = data;

  return (dispatch, getState) => {
    const token = getState().user.token;

    dispatch(
      apiRequest('POST', {
        body,
        failure: POST_SUBMISSION_FAILED,
        meta: {
          id,
          type,
        },
        pending: POST_SUBMISSION_PENDING,
        success: POST_SUBMISSION_SUCCESSFUL,
        token,
        url: `${window.location.origin}/api/v2/campaigns/${campaignId}/posts`,
      }),
    );
  };
}

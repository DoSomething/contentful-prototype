/* global FormData */

import { join } from 'path';

import apiRequest from './api';
import { PHOENIX_URL } from '../constants';
import {
  POST_SUBMISSION_FAILED,
  POST_SUBMISSION_INIT_ITEM,
  POST_SUBMISSION_PENDING,
  POST_SUBMISSION_RESET_ITEM,
  POST_SUBMISSION_SUCCESSFUL,
} from '../constants/action-types';

/**
 * Fetch posts for the specified campaign.
 *
 * @return {function}
 */
export function fetchCampaignPosts(query = {}) {
  return (dispatch, getState) => {
    const id = getState().campaign.id;
    const campaignId = getState().campaign.campaignId;

    dispatch(
      apiRequest('GET', {
        id,
        query,
        url: join(PHOENIX_URL, 'api/v2/campaigns', campaignId, 'posts'),
      }),
    );
  };
}

/**
 * Append the post submission item with the specified id
 * to the redux store.
 *
 * @param  {String} id
 * @return {Object}
 */
export function initPostSubmissionItem(id) {
  return {
    id,
    type: POST_SUBMISSION_INIT_ITEM,
  };
}

/**
 * Clear data from the post submission item with the
 * specified id.
 *
 * @param  {String} id
 * @return {Object}
 */
export function resetPostSubmissionItem(id) {
  return {
    id,
    type: POST_SUBMISSION_RESET_ITEM,
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
  if (!(data.body instanceof FormData)) {
    throw Error(
      `The supplied data.body must be an instance of FormData, instead it is an instance of ${
        data.body.constructor.name
      }.`,
    );
  }

  const { action, body, id, type } = data;

  const analytics = {
    name: `${type}-submission-action`,
    service: 'puck',
    payload: {
      action,
      campaignId,
      id,
    },
  };

  const sixpackExperiments = {
    conversion: 'reportbackPost',
  };

  // Separate endpoint for 'referral' actions since we don't post them to rogue.
  const url =
    type === 'referral'
      ? `/next/referrals`
      : `/api/v2/campaigns/${campaignId}/posts`;

  return dispatch => {
    dispatch(
      apiRequest('POST', {
        body,
        failure: POST_SUBMISSION_FAILED,
        meta: {
          id,
          type,
          analytics,
          sixpackExperiments,
        },
        pending: POST_SUBMISSION_PENDING,
        success: POST_SUBMISSION_SUCCESSFUL,
        url,
      }),
    );
  };
}

/* global FormData */

import { join } from 'path';

import apiRequest from './api';
import { PHOENIX_URL } from '../constants';
import { formatEventNoun, trackAnalyticsEvent } from '../helpers/analytics';
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
    const path = join('api/v2/campaigns', campaignId, 'posts');

    dispatch(
      apiRequest('GET', {
        id,
        query,
        url: `${PHOENIX_URL}/${path}`,
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
  const { action, actionId, body, campaignContentfulId, id, type } = data;

  if (type === 'photo' && !(body instanceof FormData)) {
    throw Error(
      `The supplied data.body must be an instance of FormData, instead it is an instance of ${
        body.constructor.name
      }.`,
    );
  }

  const sixpackExperiments = {
    conversion: 'reportbackPost',
  };

  // Separate endpoint for 'referral' actions since we don't post them to rogue.
  const url =
    type === 'referral'
      ? `/next/referrals`
      : `/api/v2/campaigns/${campaignId}/posts`;

  // Track post submission event.
  trackAnalyticsEvent({
    metaData: {
      category: 'campaign_action',
      target: 'form',
      label: type,
      noun: formatEventNoun(type),
      verb: 'submitted',
    },
    contextData: {
      action,
      actionId,
      campaignContentfulId,
      campaignId,
    },
  });

  return dispatch => {
    dispatch(
      apiRequest('POST', {
        body,
        failure: POST_SUBMISSION_FAILED,
        meta: {
          action,
          actionId,
          campaignId,
          campaignContentfulId,
          id,
          sixpackExperiments,
          type,
        },
        requiresAuthentication: type === 'text',
        pending: POST_SUBMISSION_PENDING,
        success: POST_SUBMISSION_SUCCESSFUL,
        url,
      }),
    );
  };
}

/**
 * Store action posts.
 *
 * @param  {Object} data
 * @param  {Number} data.actionId
 * @param  {Object} data.body
 * @param  {String} data.id
 * @param  {String} data.type
 * @return {function}
 */
export function storePost(data) {
  const { actionId, body, id, type } = data;

  const sixpackExperiments = {
    conversion: 'reportbackPost',
  };

  // Track post submission event.
  trackAnalyticsEvent({
    metaData: {
      category: 'campaign_action',
      target: 'form',
      label: type,
      noun: formatEventNoun(type),
      verb: 'submitted',
    },
    contextData: {
      actionId,
    },
  });

  return dispatch => {
    dispatch(
      apiRequest('POST', {
        body,
        failure: POST_SUBMISSION_FAILED,
        meta: {
          sixpackExperiments,
          actionId,
          type,
          id,
        },
        requiresAuthentication: type === 'text',
        pending: POST_SUBMISSION_PENDING,
        success: POST_SUBMISSION_SUCCESSFUL,
        url: '/api/v2/posts',
      }),
    );
  };
}

/* global FormData */

import { join } from 'path';

import apiRequest from './api';
import { PHOENIX_URL } from '../constants';
import { trackAnalyticsEvent } from '../helpers/analytics';
import {
  POST_SUBMISSION_FAILED,
  POST_SUBMISSION_INIT_ITEM,
  POST_SUBMISSION_PENDING,
  POST_SUBMISSION_RESET_ITEM,
  POST_SUBMISSION_SUCCESSFUL,
} from '../constants/action-types';

const EVENT_SUFFIX = '_submission_action';

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
 * @param  {String} campaignId
 * @param  {Object} data
 * @return {function}
 */
export function storeCampaignPost(campaignId, data) {
  const { actionId, action, blockId, body, pageId, type } = data;

  if (type === 'photo' && !(body instanceof FormData)) {
    throw Error(
      `The supplied data.body must be an instance of FormData, instead it is an instance of ${body.constructor.name}.`,
    );
  }

  const sixpackExperiments = {
    conversion: 'reportbackPost',
  };

  // Track post submission event.
  trackAnalyticsEvent(`submitted_${type}${EVENT_SUFFIX}`, {
    action: 'form_submitted',
    category: 'campaign_action',
    label: type,
    context: {
      actionId,
      blockId,
      campaignId,
      pageId,
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
          id: blockId, // @TODO: rename property to blockId
          pageId,
          sixpackExperiments,
          type,
        },
        requiresAuthentication: type === 'text',
        pending: POST_SUBMISSION_PENDING,
        success: POST_SUBMISSION_SUCCESSFUL,
        url: `/api/v2/campaigns/${campaignId}/posts`,
      }),
    );
  };
}

/**
 * Store action posts.
 *
 * @param  {Object} data
 * @param  {Number} data.actionId
 * @param  {String} data.blockId
 * @param  {Object} data.body
 * @param  {String} data.campaignId
 * @param  {String} data.pageId
 * @param  {String} data.type
 * @return {function}
 */
export function storePost(data) {
  const { actionId, blockId, body, campaignId, pageId, type } = data;

  const sixpackExperiments = {
    conversion: 'reportbackPost',
  };

  // Track post submission event.
  trackAnalyticsEvent(`submitted_${type}${EVENT_SUFFIX}`, {
    action: 'form_submitted',
    category: 'campaign_action',
    label: type,
    context: {
      actionId,
      blockId,
      campaignId,
      pageId,
    },
  });

  return dispatch => {
    dispatch(
      apiRequest('POST', {
        body,
        failure: POST_SUBMISSION_FAILED,
        meta: {
          actionId,
          id: blockId, // @TODO: rename property to blockId
          sixpackExperiments,
          type,
        },
        requiresAuthentication: type === 'text',
        pending: POST_SUBMISSION_PENDING,
        success: POST_SUBMISSION_SUCCESSFUL,
        url: '/api/v2/posts',
      }),
    );
  };
}

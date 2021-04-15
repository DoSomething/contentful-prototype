/* global */

import { join } from 'path';

import apiRequest from './api';
import { PHOENIX_URL } from '../constants';
import { getUserId } from '../helpers/auth';
import {
  SIGNUP_CREATED,
  OPENED_POST_SIGNUP_MODAL,
  CLOSED_POST_SIGNUP_MODAL,
  CLICKED_REMOVE_SIGN_UP,
} from '.';
import {
  GET_CAMPAIGN_SIGNUPS_FAILED,
  GET_CAMPAIGN_SIGNUPS_PENDING,
  GET_CAMPAIGN_SIGNUPS_SUCCESSFUL,
} from '../constants/action-types';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: no existing signup was found for the campaign.
export function clickedHideAffirmation() {
  return { type: CLOSED_POST_SIGNUP_MODAL };
}

// Action: triggers the post signup affirmation modal.
// This is for admin usage.
export function clickedShowAffirmation() {
  return { type: OPENED_POST_SIGNUP_MODAL };
}

// Action: removes the current signup from campaign
// for admin to preview content
export function clickedRemoveSignUp(campaignId) {
  return { type: CLICKED_REMOVE_SIGN_UP, campaignId };
}

// Action: a new signup was created for a campaign.
export function signupCreated(campaignId) {
  return (dispatch, getState) => {
    const { user } = getState();

    dispatch({
      type: SIGNUP_CREATED,
      campaignId,
      userId: user.id,
    });
  };
}

/**
 * Dispatch action to get signups for a campaign; allows filtering via query options.
 *
 * @param  {Object} query
 * @param  {String} id
 * @return {Function}
 */
export function getCampaignSignups(id = null, query = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const campaignId = id || state.campaign.campaignId;
    const path = join('api/v2/campaigns', campaignId, 'signups');

    dispatch(
      apiRequest('GET', {
        campaignId,
        failure: GET_CAMPAIGN_SIGNUPS_FAILED,
        meta: {
          northstarId: getUserId(),
        },
        pending: GET_CAMPAIGN_SIGNUPS_PENDING,
        query,
        success: GET_CAMPAIGN_SIGNUPS_SUCCESSFUL,
        url: `${PHOENIX_URL}/${path}`,
      }),
    );
  };
}

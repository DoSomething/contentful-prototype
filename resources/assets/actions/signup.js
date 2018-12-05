/* global */

import { join } from 'path';

import apiRequest from './api';
import { PHOENIX_URL } from '../constants';
import { getUserId } from '../selectors/user';
import {
  SIGNUP_CREATED,
  SIGNUP_CLICKED_OPT_OUT,
  OPENED_POST_SIGNUP_MODAL,
  CLOSED_POST_SIGNUP_MODAL,
  CLICKED_REMOVE_SIGN_UP,
} from '../actions';
import {
  GET_CAMPAIGN_SIGNUPS_FAILED,
  GET_CAMPAIGN_SIGNUPS_PENDING,
  GET_CAMPAIGN_SIGNUPS_SUCCESSFUL,
  STORE_CAMPAIGN_SIGNUPS_FAILED,
  STORE_CAMPAIGN_SIGNUPS_PENDING,
  STORE_CAMPAIGN_SIGNUPS_SUCCESSFUL,
} from '../constants/action-types';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: no existing signup was found for the campaign.
export function clickedHideAffirmation() {
  return { type: CLOSED_POST_SIGNUP_MODAL };
}

/**
 * Action to trigger converting Sixpack experiments on signup.
 *
 * @return {Object}
 */
export function convertOnSignupAction() {
  return {
    type: 'CLICKED_SIGNUP_BUTTON',
    payload: {
      meta: {
        sixpackExperiments: {
          conversion: 'signup',
        },
      },
    },
  };
}

// Action: triggers the post signup affirmation modal.
// This is for admin usage.
export function clickedShowAffirmation() {
  return { type: OPENED_POST_SIGNUP_MODAL };
}

// Action: sends whether the user opted out of affiliate messaging.
export function clickedOptOut() {
  return { type: SIGNUP_CLICKED_OPT_OUT };
}

// Action: removes the current signup from campaign
// for admin to preview content
export function clickedRemoveSignUp(campaignId) {
  return { type: CLICKED_REMOVE_SIGN_UP, campaignId };
}

// Action: a new signup was created for a campaign.
export function signupCreated(campaignId, shouldShowAffirmation = true) {
  return (dispatch, getState) => {
    const { user } = getState();

    dispatch({
      type: SIGNUP_CREATED,
      campaignId,
      userId: user.id,
      shouldShowAffirmation,
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

    dispatch(
      apiRequest('GET', {
        campaignId,
        failure: GET_CAMPAIGN_SIGNUPS_FAILED,
        meta: {
          northstarId: getUserId(state),
        },
        pending: GET_CAMPAIGN_SIGNUPS_PENDING,
        query,
        success: GET_CAMPAIGN_SIGNUPS_SUCCESSFUL,
        url: join(PHOENIX_URL, 'api/v2/campaigns', campaignId, 'signups'),
      }),
    );
  };
}

/**
 * Dispatch action to store signup for a campaign.
 *
 * @param  {String} campaignId
 * @param  {Object} data
 * @return {Function}
 */
export function storeCampaignSignup(campaignId, data) {
  const analytics = {
    name: 'phoenix_clicked_signup',
    service: 'puck',
    payload: {
      campaignId,
    },
  };

  return dispatch => {
    dispatch(
      apiRequest('POST', {
        body: data.body,
        failure: STORE_CAMPAIGN_SIGNUPS_FAILED,
        meta: {
          id: campaignId,
          analytics,
          sixpackExperiments: { conversion: 'signup' },
          messaging: {
            success: 'Thanks for signing up!',
            failure: 'Whoops! Something went wrong!',
          },
        },
        pending: STORE_CAMPAIGN_SIGNUPS_PENDING,
        requiresAuthentication: true,
        success: STORE_CAMPAIGN_SIGNUPS_SUCCESSFUL,
        url: join(PHOENIX_URL, 'api/v2/campaigns', campaignId, 'signups'),
      }),
    );
  };
}

/**
 * Dispatch actions related to clicking a signup action.
 *
 * @param  {String} campaignId
 * @param  {Object} data
 * @return {Function}
 */
export function clickedSignupAction(campaignId, data = {}) {
  return dispatch => {
    dispatch(convertOnSignupAction());

    dispatch(storeCampaignSignup(campaignId, data));
  };
}

/* global window */

import { join } from 'path';
import { push } from 'react-router-redux';
import { Phoenix } from '@dosomething/gateway';

import apiRequest from './api';
import { isCampaignClosed } from '../helpers';
import { getUserId, isAuthenticated } from '../selectors/user';
import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_NOT_FOUND,
  SIGNUP_PENDING,
  SIGNUP_CLICKED_OPT_OUT,
  OPENED_POST_SIGNUP_MODAL,
  CLOSED_POST_SIGNUP_MODAL,
  SET_TOTAL_SIGNUPS,
  CLICKED_REMOVE_SIGN_UP,
  queueEvent,
  addNotification,
} from '../actions';
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

export function clickedSignupButton() {
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

// Action: an existing signup was found for a campaign.
export function signupFound(campaignId) {
  return (dispatch, getState) => {
    const { user } = getState();

    dispatch({
      type: SIGNUP_FOUND,
      campaignId,
      userId: user.id,
    });
  };
}

// Action: no existing signup was found for the campaign.
export function signupNotFound() {
  return { type: SIGNUP_NOT_FOUND };
}

// Action: waiting on a signup response.
// @TODO: cleanup the signup actions to use approach established in "post" action.
export function signupPending() {
  return { type: SIGNUP_PENDING };
}

/**
 * Get signups for a campaign; allows filtering via query options.
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
        url: `${window.location.origin}/api/v2/campaigns/${campaignId}/signups`,
      }),
    );
  };
}

// Action: Set the total signups in the store.
export function setTotalSignups(total) {
  return { type: SET_TOTAL_SIGNUPS, total };
}

export function storeCampaignSignup() {}

// Async Action: send signup to phoenix and
// check if the user is logged in or has an existing signup.
export function clickedSignUp(
  campaignId,
  options = null,
  shouldRedirectToActionTab = true,
) {
  return (dispatch, getState) => {
    const state = getState();
    const campaignActionUrl = join(
      '/us/campaigns',
      getState().campaign.slug,
      '/action',
    );

    // get campagin run id from state.
    const campaignRunId = state.campaign.legacyCampaignRunId;

    // If we show an affiliate option, send the value over to Rogue as details
    let details = options;

    const additionalContent = state.campaign.additionalContent || {};
    if (additionalContent.displayAffilitateOptOut && !details) {
      details = state.signups.affiliateMessagingOptOut
        ? 'affiliate-opt-out'
        : null;
    }

    // @TODO: Once we refactor this file, hopefully will not need this action
    // dispatch any longer, or flow will be more logical!
    dispatch(clickedSignupButton());

    // If the user is not logged in, handle this action later.
    if (!isAuthenticated(state)) {
      return dispatch(
        queueEvent(
          'clickedSignUp',
          campaignId,
          details,
          shouldRedirectToActionTab,
        ),
      );
    }

    // If we already have a signup, just go to the action page.
    if (state.signups.data.includes(campaignId)) {
      return shouldRedirectToActionTab
        ? dispatch(push(campaignActionUrl))
        : null;
    }

    dispatch(signupPending());

    return new Phoenix()
      .post('next/signups', { campaignId, campaignRunId, details })
      .then(response => {
        // Handle a bad signup response...
        if (!response) {
          dispatch(addNotification('error'));
        } else if (response[0] === false) {
          // If Drupal denied our signup request, check if we already had a signup.
          dispatch(
            getCampaignSignups(campaignId, {
              filter: { northstar_id: getUserId(state) },
            }),
          );
        } else {
          const isClosed = isCampaignClosed(state.campaign.endDate);

          // Create signup and track any data before redirects.
          dispatch(
            signupCreated(campaignId, shouldRedirectToActionTab && !isClosed),
          );

          // Take user to the action page if campaign is open.
          if (shouldRedirectToActionTab && !isClosed) {
            dispatch({ type: OPENED_POST_SIGNUP_MODAL });
            dispatch(push(campaignActionUrl));
          }
        }
      });
  };
}

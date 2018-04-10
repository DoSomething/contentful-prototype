import { join } from 'path';
import { get } from 'lodash';
import { push } from 'react-router-redux';

import { Phoenix } from '@dosomething/gateway';
import { isCampaignClosed } from '../helpers';
import { isAuthenticated } from '../selectors/user';
import { POST_SIGNUP_MODAL } from '../components/Modal';
import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_NOT_FOUND,
  SIGNUP_PENDING,
  SIGNUP_CLICKED_OPT_OUT,
  SET_TOTAL_SIGNUPS,
  CLICKED_REMOVE_SIGN_UP,
  queueEvent,
  addNotification,
  openModal,
} from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

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
export function signupPending() {
  return { type: SIGNUP_PENDING };
}

// Async Action: check if user already signed up for the campaign
export function checkForSignup(campaignId) {
  return (dispatch, getState) => {
    const state = getState();
    if (!isAuthenticated(state)) {
      return dispatch(signupNotFound());
    }

    return new Phoenix()
      .get('next/signups', {
        campaigns: campaignId,
        user: state.user.id,
      })
      .then(response => {
        if (!response || !response.data || !response.data[0]) {
          throw new Error('no signup found');
        }

        dispatch(signupFound(campaignId));
      })
      .catch(() => {
        dispatch(signupNotFound());
      });
  };
}

// Action: Set the total signups in the store.
export function setTotalSignups(total) {
  return { type: SET_TOTAL_SIGNUPS, total };
}

// Async Action: get the total signups for this campaign.
export function getTotalSignups(campaignId) {
  return (dispatch, getState) => {
    new Phoenix().get(`next/signups/total/${campaignId}`).then(response => {
      if (!response || !response.meta || !response.meta.pagination) {
        throw new Error('no signup metadata found');
      }

      let total = response.meta.pagination.total;
      // @TODO: Not ideal, but the browser doesn't know if this is an old cached response or not.
      if (getState().signups.thisCampaign) {
        total += 1;
      }

      dispatch(setTotalSignups(total));
    });
  };
}

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

    // If the user is not logged in, handle this action later.
    if (!isAuthenticated(state)) {
      return dispatch(queueEvent('clickedSignUp', campaignId, details));
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
          dispatch(checkForSignup(campaignId));
        } else {
          // Create signup and track any data before redirects.
          dispatch(signupCreated(campaignId));

          // Take user to the action page if campaign is open.
          const endDate = get(state.campaign.endDate, 'date', null);
          const isClosed = isCampaignClosed(endDate);
          if (shouldRedirectToActionTab && !isClosed) {
            dispatch(openModal(POST_SIGNUP_MODAL));
            dispatch(push(campaignActionUrl));
          }
        }
      });
  };
}

// Action: removes the current signup from campaign
// for admin to preview content
export function clickedRemoveSignUp() {
  return { type: CLICKED_REMOVE_SIGN_UP };
}

// Action: triggers the post signup affirmation modal.
// This is for admin usage.
export function clickedShowAffirmation() {
  return openModal(POST_SIGNUP_MODAL);
}

// Action: sends whether the user opted out of affiliate messaging.
export function clickedOptOut() {
  return { type: SIGNUP_CLICKED_OPT_OUT };
}

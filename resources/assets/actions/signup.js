import { Phoenix } from '@dosomething/gateway';
import { get as historyGet } from '../history';
import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_NOT_FOUND,
  SIGNUP_PENDING,
  SET_TOTAL_SIGNUPS,
  HIDE_AFFIRMATION,
  queueEvent,
  trackEvent,
  addNotification,
} from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: hide the signup affirmation
export function hideAffirmation() {
  return { type: HIDE_AFFIRMATION };
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

    // Take users to the action page after sign up.
    historyGet().push('/action');
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
    (new Phoenix()).get('next/signups', {
      campaigns: campaignId,
      user: getState().user.id,
    }).then((response) => {
      if (! response || ! response.data || ! response.data[0]) {
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
    (new Phoenix()).get(`next/signups/total/${campaignId}`).then((response) => {
      if (! response || ! response.meta || ! response.meta.pagination) {
        throw new Error('no signup metadata found');
      }

      let total = response.meta.pagination.total;
      // @TODO: Not ideal, but the browser doesn't know if this is an old cached response or not.
      if (getState().signups.thisCampaign) total += 1;

      dispatch(setTotalSignups(total));
    });
  };
}

// Async Action: send signup to phoenix.
export function clickedSignUp(campaignId, metadata) {
  return (dispatch, getState) => {
    // If the user is not logged in, handle this action later.
    if (! getState().user.id) {
      dispatch(queueEvent('clickedSignUp', campaignId, metadata));
      return;
    }

    // If we already have a signup, just go to the action page.
    if (getState().signups.data.includes(campaignId)) {
      historyGet().push('/action');
      return;
    }

    dispatch(signupPending());

    (new Phoenix()).post('next/signups', { campaignId }).then((response) => {
      // Handle a bad signup response...
      if (! response) dispatch(addNotification('error'));
      // If Drupal denied our signup request, check if we already had a signup.
      else if (response[0] === false) dispatch(checkForSignup(campaignId));
      // Otherwise, mark the signup as a success.
      else {
        dispatch(signupCreated(campaignId));
        dispatch(trackEvent('signup created', metadata));
      }
    });
  };
}

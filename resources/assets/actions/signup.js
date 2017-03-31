import { Phoenix } from '@dosomething/gateway';
import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_NOT_FOUND,
  SIGNUP_PENDING,
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
  }
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
  }
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
    (new Phoenix).get('signups', {
      campaigns: campaignId,
      user: getState().user.id,
    }).then(response => {
      console.log(response);
      if (!response || !response.data || !response.data[0]) {
        return dispatch(signupNotFound());
      }

      dispatch(signupFound(campaignId));
    });
  }
}

// Async Action: send signup to phoenix.
export function clickedSignUp(campaignId) {
  return dispatch => {
    dispatch(signupPending());

    (new Phoenix).post('signups', { campaignId }).then(response => {
      if (!response || !response[0]) return;

      dispatch(signupCreated(campaignId));
    });
  }
}

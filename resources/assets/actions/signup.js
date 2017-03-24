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
  return { type: SIGNUP_CREATED, campaignId };
}

// Action: an existing signup was found for a campaign.
export function signupFound(campaignId) {
  return { type: SIGNUP_FOUND, campaignId };
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
  return dispatch => {
    dispatch(signupPending());

    (new Phoenix).get(`activity/${campaignId}`).then(response => {
      if (!response || !response.sid) {
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

    return (new Phoenix).post('signups', { campaignId }).then(response => {
      if (!response || !response[0]) return;

      dispatch(signupCreated(campaignId));
    });
  }
}

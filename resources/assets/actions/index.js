import { Phoenix } from '@dosomething/gateway';

/*
 * Action names: import these constants to dispatch an event
 * without having hardcoded strings all about.
 */
export const REQUESTED_REPORTBACKS = 'REQUESTED_REPORTBACKS';
export const RECEIVED_REPORTBACKS = 'RECEIVED_REPORTBACKS';
export const STORE_REPORTBACK_PENDING = 'STORE_REPORTBACK_PENDING';
export const STORE_REPORTBACK_SUCESSFUL = 'STORE_REPORTBACK_SUCESSFUL';
export const ADD_TO_SUBMISSIONS_LIST = 'ADD_TO_SUBMISSIONS_LIST';
export const CLICKED_VIEW_MORE = 'CLICKED_VIEW_MORE';
export const USER_TOGGLED_REACTION = 'USER_TOGGLED_REACTION';
export const REACTION_COMPLETE = 'REACTION_COMPLETE';
export const SIGNUP_COMPLETE = 'SIGNUP_COMPLETE';
export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SET_CURRENTLY_SIGNED_UP = 'SET_CURRENTLY_SIGNED_UP';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: user asked for more blocks.
export function clickedViewMore() {
  return { type: CLICKED_VIEW_MORE };
}

// Action: reportback fetch initiated.
export function requestingReportbacks(node) {
  return { type: REQUESTED_REPORTBACKS, node };
}

// Action: new reportback data received.
export function receivedReportbacks(node, page, data) {
  return { type: RECEIVED_REPORTBACKS, node, page, data};
}

// Action: store new user submitted reportback.
export function storeReportback(reportback) {
  return {
    type: STORE_REPORTBACK_PENDING,
    reportback
  };
}

// Action: add user reportback submission to submissions list.
export function addToSubmissionsList(reportback) {
  return {
    type: ADD_TO_SUBMISSIONS_LIST,
    reportback
  }
}

// Action: toggled a reaction
export function userToggledReaction(reportbackItemId, value) {
  return { type: USER_TOGGLED_REACTION, reportbackItemId, value };
}

// Action: component got a reaction response back.
export function reactionComplete(reportbackItemId, reactionId) {
  return {
    type: REACTION_COMPLETE,
    reportbackItemId,
    reactionId,
  }
}

// Async Action: user liked a reportback
export function userToggledReactionOn(reportbackItemId, termId) {
  return dispatch => {
    dispatch(userToggledReaction(reportbackItemId, true));

    return (new Phoenix).post('reactions', {
      reportback_item_id: reportbackItemId,
      term_id: termId,
    })
    .then(json => {
      if (json && json[0] && json[0].created) {
        dispatch(reactionComplete(reportbackItemId, json[0].kid));
      }
    });
  }
}

// Async Action: user unliked a reportback
export function userToggledReactionOff(reportbackItemId, reactionId) {
  return dispatch => {
    dispatch(userToggledReaction(reportbackItemId, false));

    return (new Phoenix).delete(`reactions/${reactionId}`);
  }
}

// Async Action: submit a new reportback and place in submissions gallery.
export function submitReportback(reportback) {
  return dispatch => {
    dispatch(storeReportback(reportback));

    return (new Phoenix).post('reportbacks', reportback)
      .then(dispatch({
        type: STORE_REPORTBACK_SUCESSFUL
      }))
      .then((response) => {
        dispatch(addToSubmissionsList(reportback));
      });
  };
}

// Async Action: fetch another page of reportbacks.
export function fetchReportbacks(node, page) {
  return dispatch => {
    dispatch(requestingReportbacks(node));

    return (new Phoenix).get('reportbacks', { campaigns: node, page })
      .then(json => {
        dispatch(receivedReportbacks(node, page, json.data))
      })
  }
}

// Action: set whether the user is signed up for this campaign
export function setCurrentlySignedUp(status) {
  return { type: SET_CURRENTLY_SIGNED_UP, status };
}

export function signupPending() {
  return { type: SIGNUP_PENDING };
}

// Action: set whether the signup completed
export function signupComplete(campaignId) {
  return { type: SIGNUP_COMPLETE, campaignId };
}

// Async Action: check if user already signed up for the campaign
export function checkForSignup(campaignId) {
  return dispatch => (new Phoenix).get(`activity/${campaignId}`)
    .then(response => {
      if (!response || !response.sid) return;

      dispatch(signupComplete(campaignId));
      dispatch(setCurrentlySignedUp(true));
    });
}

// Async Action: send signup to phoenix.
export function clickedSignUp(campaignId) {
  return dispatch => {
    dispatch(signupPending());

    return (new Phoenix).post('signups', {
      campaignId,
    })
    .then(response => {
      if (!response || !response[0]) return;

      dispatch(signupComplete(campaignId));
      dispatch(setCurrentlySignedUp(true));
    });
  }
}

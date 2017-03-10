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
export const USER_LIKED_REPORTBACK = 'USER_LIKED_REPORTBACK';
export const USER_UNLIKED_REPORTBACK = 'USER_UNLIKED_REPORTBACK';

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

// Action: user liked a reportback
export function userLikedReportback(reportbackItemId) {
  return {
    type: USER_LIKED_REPORTBACK,
    reportbackItemId,
  }
}

// Action: user unliked a reportback
export function userUnlikedReportback(reportbackItemId) {
  return {
    type: USER_UNLIKED_REPORTBACK,
    reportbackItemId,
  }
}


// An async action creator to submit a new reportback and place in submissions gallery.
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

// An async action creator to fetch another page of reportbacks.
export function fetchReportbacks(node, page) {
  return dispatch => {
    dispatch(requestingReportbacks(node));

    return (new Phoenix).get('reportbacks', { campaigns: node, page })
      .then(json => {
        dispatch(receivedReportbacks(node, page, json.data))
      })
  }
}

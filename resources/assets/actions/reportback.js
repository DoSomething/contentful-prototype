import { Phoenix } from '@dosomething/gateway';
import {
  REQUESTED_REPORTBACKS,
  RECEIVED_REPORTBACKS,
  STORE_REPORTBACK_PENDING,
  STORE_REPORTBACK_FAILED,
  STORE_REPORTBACK_SUCCESSFUL,
  ADD_TO_SUBMISSIONS_LIST,
  REQUESTED_USER_SUBMISSIONS,
  REQUESTED_USER_SUBMISSIONS_FAILED,
  RECEIVED_USER_SUBMISSIONS
} from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

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

// Action: storeing new user submitted reportback failed.
export function storeReportbackFailed(reportback) {
  return { type: STORE_REPORTBACK_FAILED };
}

// Action: storing new user submitted reportback was successful.
export function storeReportbackSuccessful(reportback) {
  return { type: STORE_REPORTBACK_SUCCESSFUL };
}

export function requestingUserReportbacks() {
  return { type: REQUESTED_USER_SUBMISSIONS };
}

export function requestingUserReportbacksFailed() {
  return { type: REQUESTED_USER_SUBMISSIONS_FAILED };
}

export function receivedUserReportbacks() {
  return { type: RECEIVED_USER_SUBMISSIONS };
}

// Action: add user reportback submission to submissions list.
export function addToSubmissionsList(reportback) {
  return {
    type: ADD_TO_SUBMISSIONS_LIST,
    reportback
  }
}

// Async Action: submit a new reportback and place in submissions gallery.
export function submitReportback(reportback) {
  return dispatch => {
    dispatch(storeReportback(reportback));

    const url = `${window.location.origin}/reportbacks`;

    const token = document.querySelector('meta[name="csrf-token"]');

    // @TODO: Refactor once update to Gateway JS is made
    // to allow overriding header configs properly.
    return window.fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token ? token.getAttribute('content') : null,
        'Accept': 'application/json',
      },
      credentials: 'same-origin',
      body: reportback.formData,
    })
      .then((response) => {
        if (response.status >= 300) {
          dispatch(storeReportbackFailed());
          // @TODO: implement showing validation error.
        }
        else {
          dispatch(storeReportbackSuccessful());
          dispatch(addToSubmissionsList(reportback));
        }
      })
      .catch(error => console.log(error));
  };
}

export function fetchUserReportbacks(userId, campaignId) {
  if (!userId) {
    return dispatch => {
      dispatch(requestingUserReportbacksFailed());
    }
  }

  return dispatch => {
    dispatch(requestingUserReportbacks());

    return (new Phoenix).get('signups', { campaigns: campaignId, users: userId })
      .then(json => {
        dispatch(receivedUserReportbacks());

        if (json.data.length) {
          let reportback = json.data.shift().reportback;

          if (!reportback) {
            return;
          }

          reportback.reportback_items.data.forEach(reportbackItem => {
            dispatch(addToSubmissionsList(reportbackItem));
          });
        }
      });
  }
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

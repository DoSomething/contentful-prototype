import { Phoenix } from '@dosomething/gateway';
import { normalizeReportbacksResponse } from "../normalizers";
import has from 'lodash/has';
import {
  REQUESTED_REPORTBACKS,
  RECEIVED_REPORTBACKS,
  REACTION_CHANGED,
  REACTION_COMPLETE,
  STORE_REPORTBACK_PENDING,
  STORE_REPORTBACK_FAILED,
  STORE_REPORTBACK_SUCCESSFUL,
  ADD_SUBMISSION_METADATA,
  ADD_SUBMISSION_ITEM_TO_LIST,
  REQUESTED_USER_SUBMISSIONS,
  REQUESTED_USER_SUBMISSIONS_FAILED,
  RECEIVED_USER_SUBMISSIONS,
  trackEvent,
} from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: reportback fetch initiated.
export function requestedReportbacks(node) {
  return { type: REQUESTED_REPORTBACKS, node };
}

// Action: new reportback data received.
export function receivedReportbacks({ reportbacks, reportbackItems, reactions }, page, total) {
  return { type: RECEIVED_REPORTBACKS, reportbacks, reportbackItems, reactions, page, total };
}

// Action: toggled a reaction
export function reactionChanged(reportbackItemId, value) {
  return { type: REACTION_CHANGED, reportbackItemId, value };
}

// Action: reaction successfully created or updated.
export function reactionComplete(reportbackItemId, reactionId) {
  return { type: REACTION_COMPLETE, reportbackItemId, reactionId };
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

// Action: add user reportback submission metadata to submissions store.
export function addSubmissionMetadata(reportback, id) {
  return {
    type: ADD_SUBMISSION_METADATA,
    reportback,
    id
  }
}

// Action: add user reportback item submission to submissions store list.
export function addSubmissionItemToList(reportbackItem) {
  return {
    type: ADD_SUBMISSION_ITEM_TO_LIST,
    reportbackItem
  }
}

// Async Action: user reacted to a photo.
export function toggleReactionOn(reportbackItemId, termId, component) {
  return dispatch => {
    dispatch(trackEvent('reaction changed', component));
    dispatch(reactionChanged(reportbackItemId, true));

    (new Phoenix).post('reactions', {
      reportback_item_id: reportbackItemId,
      term_id: termId,
    }).then(json => {
      if (! has(json, '[0].created')) throw 'Could not create reaction.';
      dispatch(reactionComplete(reportbackItemId, json[0].kid));
    }).catch(() => {
      dispatch(reactionChanged(reportbackItemId, false));
    });
  }
}

// Async Action: user un-reacted to a photo.
export function toggleReactionOff(reportbackItemId, reactionId, component) {
  return dispatch => {
    dispatch(trackEvent('reaction changed', component));
    dispatch(reactionChanged(reportbackItemId, false));

    (new Phoenix).delete(`reactions/${reactionId}`)
      .then(json => dispatch(reactionComplete(reportbackItemId, null)))
      .catch(() =>  dispatch(reactionChanged(reportbackItemId, true)));
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
      .then(response => {
        if (response.status >= 300) {
          dispatch(storeReportbackFailed());
          // @TODO: implement showing validation error.
        }
        else {
          dispatch(storeReportbackSuccessful());

          response.json().then(json => {
            dispatch(addSubmissionMetadata(reportback, json.shift()));
            dispatch(addSubmissionItemToList(reportback));
          });
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

          dispatch(addSubmissionMetadata(reportback));
          reportback.reportback_items.data.forEach(reportbackItem => {
            dispatch(addSubmissionItemToList(reportbackItem));
          });
        }
      });
  }
}

// Async Action: fetch another page of reportbacks.
export function fetchReportbacks() {
  return (dispatch, getState) => {
    let node = getState().campaign.legacyCampaignId;
    let page = getState().reportbacks.page;

    dispatch(requestedReportbacks(node));

    (new Phoenix).get('reportbacks', { campaigns: node, page }).then(json => {
      const normalizedData = normalizeReportbacksResponse(json.data);
      dispatch(receivedReportbacks(normalizedData, json.meta.pagination.current_page, json.meta.pagination.total))
    })
  }
}

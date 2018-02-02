/* global window, document */

import { Phoenix } from '@dosomething/gateway';
import { has, get } from 'lodash';
import { normalizeReportbackItemResponse } from '../normalizers';
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
  TOGGLE_REPORTBACK_AFFIRMATION,
  queueEvent,
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
export function receivedReportbacks(
  {
    reportbacks,
    reportbackItems,
    reactions,
  },
  currentPage,
  totalPages,
  total,
) {
  return {
    type: RECEIVED_REPORTBACKS,
    reportbacks,
    reportbackItems,
    reactions,
    currentPage,
    totalPages,
    total,
  };
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
    reportback,
  };
}

// Action: storing new user submitted reportback failed.
export function storeReportbackFailed(error) {
  return {
    type: STORE_REPORTBACK_FAILED,
    error,
  };
}

// Action: storing new user submitted reportback was successful.
export function storeReportbackSuccessful(reportbackAffirmation) {
  return {
    type: STORE_REPORTBACK_SUCCESSFUL,
    reportbackAffirmation,
  };
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
    id,
  };
}

// Action: add user reportback item submission to submissions store list.
export function addSubmissionItemToList(reportbackItem) {
  return {
    type: ADD_SUBMISSION_ITEM_TO_LIST,
    reportbackItem,
  };
}

// Async Action: user reacted to a photo.
export function toggleReactionOn(reportbackItemId, termId) {
  return (dispatch, getState) => {
    // If the user is not logged in, handle this action later.
    if (! getState().user.id) {
      dispatch(queueEvent('toggleReactionOn', reportbackItemId, termId));
      return;
    }

    dispatch(reactionChanged(reportbackItemId, true));

    (new Phoenix()).post('next/reactions', {
      reportback_item_id: reportbackItemId,
      term_id: termId,
    }).then((json) => {
      if (! has(json, '[0].created')) {
        throw new Error('Could not create reaction.');
      }

      dispatch(reactionComplete(reportbackItemId, json[0].kid));
    }).catch(() => {
      dispatch(reactionChanged(reportbackItemId, false));
    });
  };
}

// Async Action: user un-reacted to a photo.
export function toggleReactionOff(reportbackItemId, reactionId) {
  return (dispatch) => {
    dispatch(reactionChanged(reportbackItemId, false));

    (new Phoenix()).delete(`next/reactions/${reactionId}`)
      .then(() => {
        dispatch(reactionComplete(reportbackItemId, null));
      })
      .catch(() => dispatch(reactionChanged(reportbackItemId, true)));
  };
}

// Action : toggle the reportback affirmation being displayed
export function toggleReportbackAffirmation(shouldShowAffirmation) {
  return {
    type: TOGGLE_REPORTBACK_AFFIRMATION,
    shouldShowAffirmation,
  };
}

// Async Action: submit a new reportback and place in submissions gallery.
export function submitReportback(url, reportback) {
  return (dispatch) => {
    dispatch(storeReportback(reportback));

    const token = document.querySelector('meta[name="csrf-token"]');

    // @TODO: Refactor once update to Gateway JS is made
    // to allow overriding header configs properly.
    return window.fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token ? token.getAttribute('content') : null,
        Accept: 'application/json',
      },
      credentials: 'same-origin',
      body: reportback.formData,
    })
      .then((response) => {
        if (response.status >= 300) {
          response.json().then((json) => {
            dispatch(storeReportbackFailed(json));
          });
        } else {
          dispatch(storeReportbackSuccessful());
          dispatch(toggleReportbackAffirmation(true));

          response.json().then((json) => {
            dispatch(addSubmissionMetadata(reportback, json.shift()));
            dispatch(addSubmissionItemToList(reportback));
          });
        }
      })
      .catch(error => console.log(error));
  };
}

export function submitReferralPost(post) {
  const url = `${window.location.origin}/next/referrals`;
  return submitReportback(url, post);
}

export function submitPhotoPost(post) {
  const url = `${window.location.origin}/next/reportbacks`;
  return submitReportback(url, post);
}

export function fetchUserReportbacks(userId, campaignId, campaignRunId) {
  if (! userId) {
    return (dispatch) => {
      dispatch(requestingUserReportbacksFailed());
    };
  }

  return (dispatch) => {
    dispatch(requestingUserReportbacks());

    return (new Phoenix()).get('next/signups', { campaigns: campaignId, users: userId, runs: campaignRunId })
      .then((json) => {
        dispatch(receivedUserReportbacks());

        if (json.data.length) {
          const reportback = json.data.shift().reportback;

          if (! reportback) {
            return;
          }

          dispatch(addSubmissionMetadata(reportback));
          reportback.reportback_items.data.forEach((reportbackItem) => {
            dispatch(addSubmissionItemToList(reportbackItem));
          });
        }
      });
  };
}

// Async Action: fetch another page of reportbacks.
export function fetchReportbacks() {
  return (dispatch, getState) => {
    const count = 24; // Count of items divisible by 2, 3, and 4,for full gallery rows!
    const node = getState().campaign.legacyCampaignId;
    const page = getState().reportbacks.currentPage + 1;

    dispatch(requestedReportbacks(node));

    (new Phoenix()).get('next/reportbackItems', { campaigns: node, count, page }).then((json) => {
      const normalizedData = normalizeReportbackItemResponse(json.data);
      const currentPage = get(json, 'meta.pagination.current_page', 1);
      const totalPages = get(json, 'meta.pagination.total_pages', 1);
      const total = get(json, 'meta.pagination.total', 0);

      dispatch(receivedReportbacks(normalizedData, currentPage, totalPages, total));
    });
  };
}

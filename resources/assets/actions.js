import { Phoenix } from '@dosomething/gateway';

/*
 * Action names: import these constants to dispatch an event
 * without having hardcoded strings all about.
 */
export const REQUESTED_REPORTBACKS = 'REQUESTED_REPORTBACKS';
export const RECEIVED_REPORTBACKS = 'RECEIVED_REPORTBACKS';

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

// An async action creator to fetch another page of reportbacks.
export function fetchReportbacks(node, page) {
  return dispatch => {
    dispatch(requestingReportbacks(node));

    return (new Phoenix).getAllReportbacks({ campaigns: node, page })
      .then(json => {
        dispatch(receivedReportbacks(node, page, json.data))
      })
  }
}

import { FEED_INCREMENT_PAGE, fetchReportbacks } from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: load an additional page of the feed.
export function displayNextPage() {
  return {type: FEED_INCREMENT_PAGE };
}

// Action: user clicked the "view more" button.
export function clickedViewMore() {
  return (dispatch, getState) => {
    // @TODO: Only dispatch if we _need_ more reportbacks.
    dispatch(fetchReportbacks());

    dispatch(displayNextPage());
  }
}

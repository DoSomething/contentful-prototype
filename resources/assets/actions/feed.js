import { FEED_INCREMENT_PAGE, fetchReportbacks } from '../actions';
import {
  totalBlockPointsInFeed,
  totalReportbackBlockPointsInFeed,
  getTotalVisibleBlockPoints,
} from '../selectors/feed';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: load an additional page of the feed.
export function displayNextPage() {
  return { type: FEED_INCREMENT_PAGE };
}

// Async Action: determine if the feed needs to fetch more photos.
export function conditionallyFetchReportbacks() {
  return (dispatch, getState) => {
    const state = getState();

    // The number of needed reportbacks are the number of reportback blocks in the
    // community feed + any additional offset that hasn't been filled by blocks.
    const overflowReportbackBlocks = Math.max(
      0,
      getTotalVisibleBlockPoints(state) - totalBlockPointsInFeed(state),
    );

    const neededReportbacks =
      totalReportbackBlockPointsInFeed(state) + overflowReportbackBlocks;

    // Dispatch an HTTP request if we don't have enough reportbacks in the store.
    if (state.reportbacks.ids.length < neededReportbacks) {
      console.log(
        `Loading more reportbacks. We have ${
          state.reportbacks.ids.length
        } and need ${neededReportbacks}.`,
      );
      dispatch(fetchReportbacks());
    }
  };
}

// Async Action: user clicked the "view more" button.
export function clickedViewMore() {
  return dispatch => {
    dispatch(displayNextPage());
    dispatch(conditionallyFetchReportbacks());
  };
}

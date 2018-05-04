import * as actions from '../actions';
import { isTimestampValid } from '../helpers';
import { getArray, EVENT_STORAGE_KEY } from '../helpers/storage';
import { isAuthenticated } from '../selectors/user';

// Action: remove completed event from storage.
export function completedEvent(index) {
  return { type: actions.COMPLETED_EVENT, index };
}

// Action: run through all of the events in the queue.
export function startQueue() {
  return (dispatch, getState) => {
    const queue = getArray('queue', EVENT_STORAGE_KEY);

    queue.forEach((event, index) => {
      // Always remove the event from storage.
      dispatch(completedEvent(index));

      // Check if the event is over 30 min old before dispatching.
      const isValidTimestamp = isTimestampValid(
        event.createdAt,
        30 * 60 * 1000,
      );

      // Check if the user successfully authenticated
      const state = getState();
      let shouldFireEvent = isValidTimestamp;
      if (shouldFireEvent && event.requiresAuth) {
        shouldFireEvent = isAuthenticated(state);
      }

      if (shouldFireEvent) {
        // Match the action creator from the saved name, load parameters to apply.
        const action = actions[event.action.creatorName];
        const args = event.action.args || [];

        // If the creator was found, dispatch the action.
        if (action) {
          dispatch(action(...args));
        }
      }
    });
  };
}

// Action: add an event to the queue.
export function queueEvent(actionCreatorName, ...args) {
  return (dispatch, getState) => {
    const northstarOptions = {};
    if (getState().campaign) {
      const { callToAction, coverImage, title } = getState().campaign;

      northstarOptions.title = encodeURIComponent(title);
      northstarOptions.coverImage = coverImage.url;
      northstarOptions.callToAction = encodeURIComponent(callToAction);
    }

    dispatch({
      type: actions.QUEUE_EVENT,
      createdAt: Date.now(),
      requiresAuth: true, // vLater - Allow more flexibility with configuring events
      northstarOptions,
      action: {
        creatorName: actionCreatorName,
        args,
      },
    });
  };
}

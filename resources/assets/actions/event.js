import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

import * as allActions from '../actions';

import { isTimestampValid } from '../helpers';
import { getDeviceId } from '../helpers/analytics';
import { getArray, EVENT_STORAGE_KEY } from '../helpers/storage';

// Action: remove completed event from storage.
export function completedEvent(index) {
  return { type: COMPLETED_EVENT, index, deviceId: getDeviceId() };
}

// Action: run through all of the events in the queue.
export function startQueue() {
  return (dispatch, getState) => {
    const queue = getArray(getDeviceId(), EVENT_STORAGE_KEY);

    queue.forEach((event, index) => {
      // Always remove the event from storage.
      dispatch(completedEvent(index));

      // Check if the event is over 30 min old before dispatching.
      const isValidTimestamp = isTimestampValid(event.createdAt, (30 * 60 * 1000));

      // Check if the user successfully authenticated
      const isAuthenticated = getState().user.id !== null;

      let shouldFireEvent = isValidTimestamp;
      if (shouldFireEvent && event.requiresAuth) {
        shouldFireEvent = isAuthenticated;
      }

      if (shouldFireEvent) {
        // Match the action creator from the saved name, load parameters to apply.
        const action = allActions[event.action.creatorName];
        const args = event.action.args || [];

        // If the creator was found, dispatch the action.
        if (action) dispatch(action(...args));
      }
    });
  }
}

// Action: add an event to the queue.
export function queueEvent(actionCreatorName, ...args) {
  return {
    type: QUEUE_EVENT,
    deviceId: getDeviceId(),
    createdAt: Date.now(),
    requiresAuth: true, //vLater - Allow more flexibility with configuring events
    action: {
      creatorName: actionCreatorName,
      args,
    }
  }
}

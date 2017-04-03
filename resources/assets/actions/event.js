import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

import * as allActions from '../actions';

import {
  getDeviceId,
  isTimestampValid,
} from '../helpers';

import {
  getArray,
  EVENT_STORAGE_KEY,
} from '../storageHelpers';

// Action: remove completed event from storage.
export function completedEvent(index) {
  return { type: COMPLETED_EVENT, index, deviceId: getDeviceId() };
}

// Action: run through all of the events in the queue.
export function startQueue() {
  return dispatch => {
    const queue = getArray(getDeviceId(), EVENT_STORAGE_KEY);

    queue.forEach((event, index) => {
      // Check if the event is over 30 min old before dispatching.
      if (isTimestampValid(event.createdAt, (30 * 60 * 1000))) {
        // Match the action creator from the saved name, load parameters to apply.
        const action = allActions[event.action.creatorName];
        const args = event.action.args || [];

        // If the creator was found, dispatch the action.
        if (action) dispatch(action.call(action.prototype, ...args));
      }

      // Always remove the event from storge.
      dispatch(completedEvent(index));
    });
  }
}

// Action: add an event to the queue.
export function queueEvent(actionCreatorName) {
  const args = [...arguments];
  args.shift();

  return {
    type: QUEUE_EVENT,
    deviceId: getDeviceId(),
    createdAt: Date.now(),
    redirectToLogin: true, //vLater - Allow more flexibility with events
    action: {
      creatorName: actionCreatorName,
      args,
    }
  }
}

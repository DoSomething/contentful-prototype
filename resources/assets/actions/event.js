import {
  getDeviceId,
  isTimestampValid,
} from '../helpers';

import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

// Action: remove completed event from storage.
export function completedEvent(index) {
  return { type: COMPLETED_EVENT, index };
}

// Action: run through all of the events in the queue.
export function startQueue() {
  return (dispatch, getState) => {
    // Get events
    // If still valid
    // Dispatch action
    // Dispatch completed event
  }
}

// Action: add an event to the queue.
export function queueEvent(action) {
  const params = [...arguments];
  params.shift();

  return {
    type: QUEUE_EVENT,
    deviceId: getDeviceId(),
    createdAt: Date.now(),
    action,
    params,
  }
}

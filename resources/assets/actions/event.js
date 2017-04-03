import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

import {
  getDeviceId,
  isTimestampValid,
} from '../helpers';

import {
  get as storageGet,
  EVENT_STORAGE_KEY,
} from '../storageHelpers';

// Action: remove completed event from storage.
export function completedEvent(index) {
  return { type: COMPLETED_EVENT, index, deviceId: getDeviceId() };
}

// Action: run through all of the events in the queue.
export function startQueue() {
  return dispatch => {
    const queue = storageGet(getDeviceId(), EVENT_STORAGE_KEY);

    queue.forEach((event, index) => {
      // Check if the event is over 30 min old.
      if (isTimestampValid(event.createdAt, (30 * 60 * 1000))) dispatch(event.action);

      dispatch(completedEvent(index));
    });
  }
}

// Action: add an event to the queue.
export function queueEvent(action) {
  return {
    type: QUEUE_EVENT,
    deviceId: getDeviceId(),
    createdAt: Date.now(),
    action: action,
  }
}

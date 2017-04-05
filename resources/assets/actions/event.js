import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

import * as allActions from '../actions';

import { isTimestampValid } from '../helpers';
import { getDeviceId } from '../helpers/analytics';

import {
  getArray,
  EVENT_STORAGE_KEY,
} from '../helpers/storage';

// Action: remove completed event from storage.
export function completedEvent(index) {
  return { type: COMPLETED_EVENT, index, deviceId: getDeviceId() };
}

// Action: run through all of the events in the queue.
export function startQueue() {
  return (dispatch, getState) => {
    const queue = [
      ...getArray(getDeviceId(), EVENT_STORAGE_KEY),
      ...getArray(getState().user.id, EVENT_STORAGE_KEY),
    ];

    queue.forEach((event, index) => {
      const isTimestampValid = isTimestampValid(event.createdAt, (30 * 60 * 1000));

      // Check if the event has a timestamp, if it does, check if its still valid.
      // If it doesn't have a timestamp, just run it.
      if (!event.createdAt || (event.createdAt && isTimestampValid)) {
        // Match the action creator from the saved name, load parameters to apply.
        const action = allActions[event.action.creatorName];
        const args = event.action.args || [];

        // If the creator was found, dispatch the action.
        if (action) dispatch(action(...args));
      }

      // Always remove the event from storge.
      dispatch(completedEvent(index));
    });
  }
}

// Action: add an event to the queue which requires authentication
export function queueAuthEvent(actionCreatorName, ...args) {
  return {
    type: QUEUE_EVENT,
    id: getDeviceId(),
    createdAt: Date.now(),
    redirectToLogin: true,
    action: {
      creatorName: actionCreatorName,
      args,
    }
  }
}

// Action: add an event to the queue which is tied to this user
export function queueUserEvent(actionCreatorName, ...args) {
  return (dispatch, getState) => {
    dispatch({
      type: QUEUE_EVENT,
      id: getState().user.id,
      redirectToLogin: false,
      action: {
        creatorName: actionCreatorName,
        args,
      }
    })
  }
}

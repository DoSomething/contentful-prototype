import * as actions from '../actions';

import { isTimestampValid } from '../helpers';
import { getDeviceId } from '../helpers/analytics';
import { getArray, EVENT_STORAGE_KEY } from '../helpers/storage';

// Action: remove completed event from storage.
export function completedEvent(index) {
  return { type: actions.COMPLETED_EVENT, index, deviceId: getDeviceId() };
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

      const isAuthenticated = getState().user.id !== null;

      if (isValidTimestamp && isAuthenticated) {
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
export function queueEvent(action, auth) {
  return {
    type: actions.QUEUE_EVENT,
    deviceId: getDeviceId(),
    createdAt: Date.now(),
    auth,
    action,
  };
}

// Action: add a generic authentication event to the queue.
export function queueGenericAuthEvent(creatorName, ...args) {
  const auth = { url: '/next/login' };
  const action = { creatorName, args };

  return queueEvent(action, auth);
}

// Action: add a facebook authentication event to the queue.
export function queueFacebookAuthEvent(creatorName, ...args) {
  const env = window.ENV || {};
  const auth = { url: `${env.NORTHSTAR_URL}/facebook/continue` };
  const action = { creatorName, args };

  return queueEvent(action, auth);
}

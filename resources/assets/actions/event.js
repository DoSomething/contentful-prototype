import {
  QUEUE_EVENT,
  RUN_QUEUE,
} from '../actions';

// Action: run through all of the events in the queue.
export function runQueue() {
  return { type: RUN_QUEUE };
}

// Action: add an event to the queue.
export function queueEvent(action) {
  const params = [...arguments];
  params.shift();

  return {
    type: QUEUE_EVENT,
    action,
    params,
  }
}

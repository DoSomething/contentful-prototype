/* global window */

import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

import {
  append as storageAppend,
  splice as storageSplice,
  EVENT_STORAGE_KEY,
} from '../helpers/storage';

/**
 * Events reducer:
 */
const events = (state = {}, action) => {
  switch (action.type) {
    case QUEUE_EVENT:
      storageAppend('queue', EVENT_STORAGE_KEY, action);

      if (action.requiresAuth) {
        window.location.href = '/next/login';
      }

      return state;

    case COMPLETED_EVENT:
      storageSplice('queue', EVENT_STORAGE_KEY, action.index);
      return state;

    default:
      return state;
  }
};

export default events;

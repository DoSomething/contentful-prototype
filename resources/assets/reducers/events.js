import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

import {
  append as storageAppend,
  get as storageGet,
  EVENT_STORAGE_KEY,
} from '../storageHelpers';

/**
 * Events reducer:
 */
const events = (state = {}, action) => {
  switch (action.type) {
    case QUEUE_EVENT:
      storageAppend(action.deviceId, EVENT_STORAGE_KEY, {
        action: action.action,
        params: action.params,
      });

      return state;

    case COMPLETED_EVENT:
      return state;

    default:
      return state;
  }
}

export default events;

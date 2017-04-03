import {
  QUEUE_EVENT,
  COMPLETED_EVENT,
} from '../actions';

import {
  append as storageAppend,
  splice as storageSplice,
  EVENT_STORAGE_KEY,
} from '../storageHelpers';

/**
 * Events reducer:
 */
const events = (state = {}, action) => {
  switch (action.type) {
    case QUEUE_EVENT:
      storageAppend(action.deviceId, EVENT_STORAGE_KEY, action);

      if (action.redirectToLogin) {
        window.location.href = '/login';
      }

      return state;

    case COMPLETED_EVENT:
      storageSplice(action.deviceId, EVENT_STORAGE_KEY, action.index);
      return state;

    case 'TEST':
      console.log('EYYYYY');
      return state;

    default:
      return state;
  }
}

export default events;

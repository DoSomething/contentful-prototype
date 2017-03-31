import {
  QUEUE_EVENT,
  RUN_QUEUE,
} from '../actions';

/**
 * Events reducer:
 */
const events = (state = {}, action) => {
  switch (action.type) {
    case QUEUE_EVENT:
      return state;

    case RUN_QUEUE:
      return state;

    default:
      return state;
  }
}

export default events;

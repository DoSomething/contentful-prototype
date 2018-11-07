import { has } from 'lodash';

import { QUEUE_ADD_ITEM, QUEUE_REMOVE_ITEM } from '../constants/action-types';

/**
 * Queue reducer.
 */
const queue = (state = {}, action) => {
  console.log(action);

  if (action.key && !has(state, action.key)) {
    state[action.key] = [];
  }

  console.log(state);

  switch (action.type) {
    case QUEUE_ADD_ITEM:
      return { ...state[action.key], [action.key]: 'herro' }; // um, no...
    // return state;

    case QUEUE_REMOVE_ITEM:
      return state;

    default:
      return state;
  }
};

export default queue;

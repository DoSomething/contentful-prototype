import { REQUESTED_BLOCKS, RECIEVED_BLOCKS } from '../actions';

/**
 * Block reducer:
 */
const blocks = (state = {}, action) => {
  switch (action.type) {
    case REQUESTED_BLOCKS:
      return state;

    case RECIEVED_BLOCKS:
      return Object.assign({}, state, {
        data: state.blocks.concat(action.blocks),
      });

    default:
      return state;
  }
}

export default blocks;

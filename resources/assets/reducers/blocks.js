import { REQUESTED_BLOCKS, RECIEVED_BLOCKS } from '../actions';

/**
 * Block reducer:
 */
const blocks = (state = {}, action) => {
  switch (action.type) {
    case RECIEVED_BLOCKS:
      return Object.assign({}, state, {
        blocks: state.blocks.concat(action.blocks),
      });

    default:
      return state;
  }
}

export default blocks;

import { CREATED_BLOCKS } from '../actions';

/**
 * Block reducer:
 */
const blocks = (state = {}, action) => {
  switch (action.type) {
    case CREATED_BLOCKS:
      return Object.assign({}, state, {
        data: state.data.concat(action.blocks),
      });

    default:
      return state;
  }
}

export default blocks;

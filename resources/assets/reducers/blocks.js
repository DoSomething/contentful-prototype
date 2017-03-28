import { FEED_INCREMENT_PAGE } from '../actions';

/**
 * Block reducer:
 */
const blocks = (state = {}, action) => {
  switch (action.type) {
    case FEED_INCREMENT_PAGE:
      return {...state, offset: state.offset + 1};

    default:
      return state;
  }
}

export default blocks;

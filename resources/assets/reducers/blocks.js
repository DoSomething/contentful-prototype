import { CLICKED_VIEW_MORE } from '../actions';

/**
 * Block reducer:
 */
const blocks = (state = {}, action) => {
  switch (action.type) {
    case CLICKED_VIEW_MORE:
      return {...state, offset: state.offset + 1};

    default:
      return state;
  }
}

export default blocks;

import { CLICKED_VIEW_MORE } from '../actions';

/**
 * Block reducer:
 */
const blocks = (state = {}, action) => {
  switch (action.type) {
    case CLICKED_VIEW_MORE:
      return Object.assign({}, state, {
        offset: state.offset + 1,
      });

    default:
      return state;
  }
}

export default blocks;

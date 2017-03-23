import {
  CLICKED_VIEW_MORE,
} from '../actions';

/**
 * Analytics reducer:
 * WARNING: Do NOT rely on this for any components. This is purley for data tracking.
 */
const analytics = (state = {}, action) => {
  return {
    ...state,
    action: action.type,
  };
}

export default analytics;

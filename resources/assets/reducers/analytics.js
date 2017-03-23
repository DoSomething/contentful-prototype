import {
  CLICKED_VIEW_MORE,
} from '../actions';

/**
 * Analytics reducer:
 * WARNING: Do NOT rely on this for any components. This is purley for data tracking.
 */
const analytics = (state = {}, action) => {
  const data = {...action};
  delete data.type;

  return {
    ...state,
    action: action.type,
    data,
  };
}

export default analytics;

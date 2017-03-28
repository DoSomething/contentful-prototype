import {
  REQUESTED_FACEBOOK_SHARE,
  FACEBOOK_SHARE_COMPLETED,
  FACEBOOK_SHARE_CANCELLED,
} from '../actions';

/**
 * Share reducer:
 */
const share = (state = {}, action) => {
  switch (action.type) {
    case REQUESTED_FACEBOOK_SHARE:
      return {...state, status: 'pending'};

    case FACEBOOK_SHARE_COMPLETED:
      return {...state, status: 'complete'};

    case FACEBOOK_SHARE_CANCELLED:
      return {...state, status: 'cancelled'};

    default:
      return state;
  }
}

export default share;

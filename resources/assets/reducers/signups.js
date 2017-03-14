import {
  SIGNUP_COMPLETE,
  SET_CURRENTLY_SIGNED_UP
} from '../actions';

/**
 * Block reducer:
 */
const blocks = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_COMPLETE:
      const signups = state.data;

      signups.push(action.campaignId);
      localStorage.setItem('signups', signups);

      return {...state, data: signups};

    case SET_CURRENTLY_SIGNED_UP:
      return {...state, status: action.status};

    default:
      return state;
  }
}

export default blocks;

import {
  SIGNUP_COMPLETE,
  SIGNUP_PENDING,
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

      return {
        ...state,
        data: signups,
        thisSession: true,
      };

    case SIGNUP_PENDING:
      return { ...state, pending: true };

    case SET_CURRENTLY_SIGNED_UP:
      return {
        ...state,
        thisCampaign: action.status,
        pending: false
      };

    default:
      return state;
  }
}

export default blocks;

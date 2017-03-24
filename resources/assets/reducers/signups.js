import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_PENDING,
  SIGNUP_NOT_FOUND,
} from '../actions';

/**
 * Signup reducer:
 */
const signupReducer = (state = {}, action) => {
  const signups = state.data;

  switch (action.type) {
    case SIGNUP_CREATED:
      signups.push(action.campaignId);
      localStorage.setItem('signups', signups);

      return {
        ...state,
        data: signups,
        isPending: false,
        thisSession: true,
      };

    case SIGNUP_FOUND:
      signups.push(action.campaignId);
      localStorage.setItem('signups', signups);

      return {
        ...state,
        data: signups,
        isPending: false
      };

    case SIGNUP_PENDING:
      return { ...state, isPending: true };

    case SIGNUP_NOT_FOUND:
      return { ...state, isPending: false };

    default:
      return state;
  }
};

export default signupReducer;

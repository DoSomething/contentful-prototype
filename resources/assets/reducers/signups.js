import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_PENDING,
  SIGNUP_NOT_FOUND,
  HIDE_AFFIRMATION,
} from '../actions';

import {
  set as storageSet,
  SIGNUP_STORAGE_KEY,
} from '../helpers/storage';

/**
 * Signup reducer:
 */
const signupReducer = (state = {}, action) => {
  const signups = state.data;

  switch (action.type) {
    case SIGNUP_CREATED:
      signups.push(action.campaignId);
      storageSet(action.userId, SIGNUP_STORAGE_KEY, signups);

      return {
        ...state,
        data: signups,
        isPending: false,
        thisSession: true,
        showAffirmation: true,
      };

    case SIGNUP_FOUND:
      signups.push(action.campaignId);
      storageSet(action.userId, SIGNUP_STORAGE_KEY, signups);

      return {
        ...state,
        data: signups,
        isPending: false
      };

    case SIGNUP_PENDING:
      return { ...state, isPending: true };

    case SIGNUP_NOT_FOUND:
      return { ...state, isPending: false };

    case HIDE_AFFIRMATION:
      return { ...state, showAffirmation: false };

    default:
      return state;
  }
};

export default signupReducer;

import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_PENDING,
  SIGNUP_NOT_FOUND,
} from '../actions';

import { set as storageSet } from '../storageHelpers';
const STORAGE_KEY = 'signups';

/**
 * Signup reducer:
 */
const signupReducer = (state = {}, action) => {
  const signups = state.data;

  switch (action.type) {
    case SIGNUP_CREATED:
      signups.push(action.campaignId);
      storageSet(action.userId, STORAGE_KEY, signups);

      return {
        ...state,
        data: signups,
        isPending: false,
        thisSession: true,
      };

    case SIGNUP_FOUND:
      signups.push(action.campaignId);
      storageSet(action.userId, STORAGE_KEY, signups);

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

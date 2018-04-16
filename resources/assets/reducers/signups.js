import {
  SIGNUP_CREATED,
  SIGNUP_FOUND,
  SIGNUP_PENDING,
  SIGNUP_NOT_FOUND,
  SIGNUP_CLICKED_OPT_OUT,
  OPENED_POST_SIGNUP_MODAL,
  CLOSED_POST_SIGNUP_MODAL,
  SET_TOTAL_SIGNUPS,
  CLICKED_REMOVE_SIGN_UP,
} from '../actions';

import { set as storageSet, SIGNUP_STORAGE_KEY } from '../helpers/storage';

/**
 * Signup reducer:
 */
const signupReducer = (state = {}, action) => {
  let signups = [];

  switch (action.type) {
    case SIGNUP_CREATED:
      signups = [...state.data, action.campaignId];

      storageSet(action.userId, SIGNUP_STORAGE_KEY, signups);

      return {
        ...state,
        data: signups,
        isPending: false,
        thisSession: true,
        thisCampaign: true,
        shouldShowAffirmation: true,
        total: state.total + 1,
      };

    case OPENED_POST_SIGNUP_MODAL:
      return {
        ...state,
        shouldShowAffirmation: true,
      };

    case CLOSED_POST_SIGNUP_MODAL:
      return {
        ...state,
        shouldShowAffirmation: false,
      };

    case SIGNUP_FOUND:
      signups = [...state.data, action.campaignId];

      storageSet(action.userId, SIGNUP_STORAGE_KEY, signups);

      return {
        ...state,
        data: signups,
        isPending: false,
        thisCampaign: true,
      };

    case SIGNUP_PENDING:
      return { ...state, isPending: true };

    case SIGNUP_NOT_FOUND:
      return { ...state, isPending: false };

    case SET_TOTAL_SIGNUPS:
      return { ...state, total: action.total };

    case SIGNUP_CLICKED_OPT_OUT:
      return {
        ...state,
        affiliateMessagingOptOut: !state.affiliateMessagingOptOut,
      };

    case CLICKED_REMOVE_SIGN_UP:
      return { ...state, thisCampaign: false };

    default:
      return state;
  }
};

export default signupReducer;

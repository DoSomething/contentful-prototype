import { pull } from 'lodash';

import { set as storageSet, SIGNUP_STORAGE_KEY } from '../helpers/storage';
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
import {
  GET_CAMPAIGN_SIGNUPS_FAILED,
  GET_CAMPAIGN_SIGNUPS_PENDING,
  GET_CAMPAIGN_SIGNUPS_SUCCESSFUL,
} from '../constants/action-types';

/**
 * Signup reducer:
 */
const signupReducer = (state = {}, action) => {
  let signups = [];

  // console.log([state, action]);

  switch (action.type) {
    case GET_CAMPAIGN_SIGNUPS_FAILED:
      console.log('♻️ reducers/signups');
      console.log(action);

      return { ...state, isPending: false, thisCampaign: false };

    case GET_CAMPAIGN_SIGNUPS_PENDING:
      console.log('♻️ reducers/signups');
      console.log(action);

      // return { ...state, isPending: true };

      return state;

    case GET_CAMPAIGN_SIGNUPS_SUCCESSFUL:
      console.log('♻️ reducers/signups');
      console.log(action);

      // return { ...state }

      return state;

    case SIGNUP_CREATED:
      signups = [...state.data, action.campaignId];

      storageSet(action.userId, SIGNUP_STORAGE_KEY, signups);

      return {
        ...state,
        data: signups,
        isPending: false,
        thisCampaign: true,
        shouldShowAffirmation: action.shouldShowAffirmation,
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
      console.log('✅ Signup found!');
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
      console.log('⬇️ Reducer: Signup Not Found...');

      // Not sure why we don't also set thisCampaign to false here? So trying it out.
      return { ...state, isPending: false, thisCampaign: false };

    case SET_TOTAL_SIGNUPS:
      return { ...state, total: action.total };

    case SIGNUP_CLICKED_OPT_OUT:
      return {
        ...state,
        affiliateMessagingOptOut: !state.affiliateMessagingOptOut,
      };

    case CLICKED_REMOVE_SIGN_UP:
      return {
        ...state,
        // Remove the current campaign's ID from the store,
        // so admins can see what the page would look like.
        data: pull(state.data, action.campaignId),
      };

    default:
      return state;
  }
};

export default signupReducer;

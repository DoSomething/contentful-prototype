import { get, pull } from 'lodash';

import { set as storageSet, SIGNUP_STORAGE_KEY } from '../helpers/storage';
import {
  SIGNUP_CREATED,
  OPENED_POST_SIGNUP_MODAL,
  CLOSED_POST_SIGNUP_MODAL,
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
  const data = get(action, 'response.data');
  let signups = [];

  switch (action.type) {
    case GET_CAMPAIGN_SIGNUPS_FAILED:
      return { ...state, isPending: false };

    case GET_CAMPAIGN_SIGNUPS_PENDING:
      return { ...state, isPending: true };

    case GET_CAMPAIGN_SIGNUPS_SUCCESSFUL:
      if (data && data.length) {
        // @TODO: I think this should be an array of objects, with the key being the
        // campaign ID and the value being an object with info properties like "quantity".
        signups = [...state.data, data[0].campaign_id];

        storageSet(action.meta.northstarId, SIGNUP_STORAGE_KEY, signups);
      }

      return {
        ...state,
        data: signups,
        isPending: false,
      };

    case SIGNUP_CREATED:
      signups = [...state.data, action.campaignId];

      storageSet(action.userId, SIGNUP_STORAGE_KEY, signups);

      return {
        ...state,
        data: signups,
        isPending: false,
        shouldShowAffirmation: true,
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

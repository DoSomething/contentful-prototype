import {
  FOUND_COMPETITION,
  JOINED_COMPETITION,
  COMPETITION_PENDING,
} from '../actions';

import {
  set as storageSet,
  COMPETITION_STORAGE_KEY
} from '../helpers/storage';

/**
 * Competitions reducer:
 */
 const competitions = (state = {}, action) => {
   let competitions = [];

   switch (action.type) {
     case JOINED_COMPETITION:
      competitions = [
        ...state.data,
        action.campaignId,
      ];

      storageSet(action.userId, COMPETITION_STORAGE_KEY, competitions);

      return {
        ...state,
        data: competitions,
        isPending: false,
        thisCampaign: true,
        showConfirmation: true,
      };

     case FOUND_COMPETITION:
       competitions = [
         ...state,data,
         action.campaignId,
       ];

       storageSet(action.userId, COMPETITION_STORAGE_KEY, competitions);

       return {
         ...state,
         data: competitions,
         isPending: false,
         thisCampaign: false,
         showConfirmation: false,
       };

    case COMPETITION_PENDING:
      return {
        ...state,
        isPending: true,
      };

     default:
       return state;
   }
 };

export default competitions;

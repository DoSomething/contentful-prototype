import {
  COMPETITION_FOUND,
  JOINED_COMPETITION,
  COMPETITION_PENDING,
} from '../actions';

import {
  set as storageSet,
  COMPETITION_STORAGE_KEY,
} from '../helpers/storage';

/**
 * Competitions reducer:
 */
const competitions = (state = {}, action) => {
  const key = `${action.userId}-${action.campaignId}-${action.campaignRunId}`;
  const joinedCompetitions = [...(state.data || []), action.campaignId];

  switch (action.type) {
    case JOINED_COMPETITION:
      storageSet(key, COMPETITION_STORAGE_KEY, joinedCompetitions);

      return {
        ...state,
        data: joinedCompetitions,
        isPending: false,
        thisCampaign: true,
        showConfirmation: true,
      };

    case COMPETITION_FOUND:
      storageSet(key, COMPETITION_STORAGE_KEY, joinedCompetitions);

      return {
        ...state,
        data: joinedCompetitions,
        isPending: false,
        thisCampaign: true,
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

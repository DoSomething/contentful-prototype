import { Phoenix } from '@dosomething/gateway';
import {
  JOINED_COMPETITION,
  COMPETITION_FOUND,
  COMPETITION_PENDING,
  addNotification,
} from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: join the competition for the given campaign & run id
export function joinCompetition(campaignId, campaignRunId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    dispatch({ type: COMPETITION_PENDING });

    (new Phoenix()).post('next/contests/users', {
      legacyCampaignId: campaignId,
      legacyCampaignRunId: campaignRunId,
    }).then((response) => {
      if (! response) throw new Error('competition signup failed');
      if (response.data) dispatch({ type: JOINED_COMPETITION, campaignId, userId });
    }).catch((err) => {
      dispatch(addNotification('error'));
    });
  };
}

// Action: check if the user joined the competition for the given campaign & run id
export function checkForCompetition(campaignId, campaignRunId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;

    (new Phoenix()).post('next/contests/users', {
      legacyCampaignId: campaignId,
      legacyCampaignRunId: campaignRunId,
    }).then((response) => {
      if (! response) throw new Error('competition get failed');
      if (response.data) dispatch({ type: COMPETITION_FOUND, campaignId, userId });
    }).catch((err) => {
      dispatch(addNotification('error'));
    });
  };
}

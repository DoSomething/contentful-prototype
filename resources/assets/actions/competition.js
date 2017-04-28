import { Phoenix } from '@dosomething/gateway';
import {
  JOINED_COMPETITION,
  COMPETITION_FOUND,
  COMPETITION_PENDING,
  addNotification
} from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: join the competition for the given campaign id
export function joinCompetition(campaignId) {
  return (dispatch, getState) => {
    dispatch({ type: COMPETITION_PENDING });

    (new Phoenix()).post('next/contests/users', {
      legacyCampaignId: campaignId,
      legacyCampaignRunId: getState().campaign.legacyCampaignRunId,
    }).then((response) => {
      if (! response) throw new Error('competition signup failed');
      console.log(response);
    }).catch((err) => {
      console.error(err);
      dispatch(addNotification('error'));
    });

    // @TODO: Obviously, replace this with an api call.
    // setTimeout(() => {
    //   const userId = getState().user.id;
    //   dispatch({ type: JOINED_COMPETITION, campaignId, userId });
    // }, 2000);
  };
}

// Action: check if the user joined the competition for the given campaign id
export function checkForCompetition(campaignId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;

    // @TODO: make api call
    dispatch({ type: COMPETITION_FOUND, campaignId, userId });
  };
}

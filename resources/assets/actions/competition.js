import { Phoenix } from '@dosomething/gateway';
import {
  JOINED_COMPETITION,
  COMPETITION_FOUND,
  COMPETITION_PENDING,
  addNotification,
  closeModal,
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
      if (response.data) {
        dispatch({ type: JOINED_COMPETITION, campaignId, userId });

        if (getState().modal.shouldShowModal) dispatch(closeModal());
      }
    }).catch(() => {
      dispatch(addNotification('error'));
    });
  };
}

// Action: check if the user joined the competition for the given campaign & run id
export function checkForCompetition(campaignId, campaignRunId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;

    (new Phoenix()).get('next/contests/users', {
      campaign_id: campaignId,
      campaign_run_id: campaignRunId,
    }).then((response) => {
      if (! response) throw new Error('competition get failed');

      const joinedCompetition = response.data &&
        (response.data.waitingRoom || response.data.competition);

      if (joinedCompetition) dispatch({ type: COMPETITION_FOUND, campaignId, userId });
    }).catch(() => {
      dispatch(addNotification('error'));
    });
  };
}

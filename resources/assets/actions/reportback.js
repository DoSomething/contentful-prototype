import { Phoenix } from '@dosomething/gateway';
import { has } from 'lodash';

import { isAuthenticated } from '../selectors/user';
import { REACTION_CHANGED, REACTION_COMPLETE, queueEvent } from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: toggled a reaction
export function reactionChanged(reportbackItemId, value) {
  return { type: REACTION_CHANGED, reportbackItemId, value };
}

// Action: reaction successfully created or updated.
export function reactionComplete(reportbackItemId, reactionId) {
  return { type: REACTION_COMPLETE, reportbackItemId, reactionId };
}

// Async Action: user reacted to a photo.
export function toggleReactionOn(reportbackItemId, termId) {
  return (dispatch, getState) => {
    // If the user is not logged in, handle this action later.
    const state = getState();
    if (!isAuthenticated(state)) {
      dispatch(queueEvent('toggleReactionOn', reportbackItemId, termId));
      return;
    }

    dispatch(reactionChanged(reportbackItemId, true));

    new Phoenix()
      .post('next/reactions', {
        reportback_item_id: reportbackItemId,
        term_id: termId,
      })
      .then(json => {
        if (!has(json, '[0].created')) {
          throw new Error('Could not create reaction.');
        }

        dispatch(reactionComplete(reportbackItemId, json[0].kid));
      })
      .catch(() => {
        dispatch(reactionChanged(reportbackItemId, false));
      });
  };
}

// Async Action: user un-reacted to a photo.
export function toggleReactionOff(reportbackItemId, reactionId) {
  return dispatch => {
    dispatch(reactionChanged(reportbackItemId, false));

    new Phoenix()
      .delete(`next/reactions/${reactionId}`)
      .then(() => {
        dispatch(reactionComplete(reportbackItemId, null));
      })
      .catch(() => dispatch(reactionChanged(reportbackItemId, true)));
  };
}

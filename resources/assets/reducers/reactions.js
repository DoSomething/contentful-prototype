import {
  REACTION_CHANGED,
  REACTION_COMPLETE,
} from '../actions';
import update from 'react/lib/update';

/**
 * Reactions reducer:
 */
const reactions = (state = {}, action) => {
  switch (action.type) {
    case REACTION_CHANGED:
      return update(state, {
        data: {
          [action.reportbackItemId]: {
            reacted: {$set: action.value},
            total: {
              $set: state.data[action.reportbackItemId].total +
                (action.value ? 1 : -1)
            },
          }
        }
      });

    case REACTION_COMPLETE:
      return update(state, {
        data: {
          [action.reportbackItemId]: {
            id: {$set: action.reactionId},
          }
        }
      });

    default:
      return state;
  }
}

export default reactions;

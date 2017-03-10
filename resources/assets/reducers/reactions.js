import {
  USER_LIKED_REPORTBACK,
  USER_UNLIKED_REPORTBACK,
  REACTION_COMPLETE,
} from '../actions';
const update = require('react/lib/update');

/**
 * Reactions reducer:
 */
const reactions = (state = {}, action) => {
  let data = {};

  switch (action.type) {
    case USER_LIKED_REPORTBACK:
      return update(state, {
        data: {
          [action.reportbackItemId]: {
            reacted: {$set: true}, //TODO: Bump total +1
          }
        }
      });

    case USER_UNLIKED_REPORTBACK:
      return update(state, {
        data: {
          [action.reportbackItemId]: {
            reacted: {$set: false}, //TODO: Bump total -1
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

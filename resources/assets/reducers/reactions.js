import {
  USER_TOGGLED_REACTION_ON,
  USER_TOGGLED_REACTION_OFF,
  REACTION_COMPLETE,
} from '../actions';
const update = require('react/lib/update');

/**
 * Reactions reducer:
 */
const reactions = (state = {}, action) => {
  let data = {};

  switch (action.type) {
    case USER_TOGGLED_REACTION_ON:
      return update(state, {
        data: {
          [action.reportbackItemId]: {
            reacted: {$set: true},
            total: {$set: state.data[action.reportbackItemId].total + 1},
          }
        }
      });

    case USER_TOGGLED_REACTION_OFF:
      return update(state, {
        data: {
          [action.reportbackItemId]: {
            reacted: {$set: false},
            total: {$set: state.data[action.reportbackItemId].total - 1},
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

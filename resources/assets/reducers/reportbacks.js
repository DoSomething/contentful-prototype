import update from 'react-addons-update';

import { REACTION_CHANGED, REACTION_COMPLETE } from '../actions';

/**
 * Reportback reducer:
 */
const reportbacks = (state = {}, action) => {
  switch (action.type) {
    case REACTION_CHANGED: {
      if (!state.itemEntities[action.reportbackItemId]) {
        return state;
      }

      return update(state, {
        itemEntities: {
          [action.reportbackItemId]: {
            reaction: {
              reacted: { $set: action.value },
              total: {
                $set:
                  state.itemEntities[action.reportbackItemId].reaction.total +
                  (action.value ? 1 : -1), // eslint-disable-line max-len
              },
            },
          },
        },
      });
    }

    case REACTION_COMPLETE:
      return update(state, {
        itemEntities: {
          [action.reportbackItemId]: {
            reaction: {
              id: { $set: action.reactionId },
            },
          },
        },
      });

    default:
      return state;
  }
};

export default reportbacks;

import merge from 'lodash/merge';
import update from 'react/lib/update';
import {
  REQUESTED_REPORTBACKS,
  RECEIVED_REPORTBACKS,
  REACTION_CHANGED,
  REACTION_COMPLETE,
} from '../actions';

/**
 * Reportback reducer:
 */
const reportbacks = (state = {}, action) => {
  switch (action.type) {
    case REQUESTED_REPORTBACKS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVED_REPORTBACKS:
      return {
        ...state,
        isFetching: false,
        page: action.page + 1,
        total: action.total,
        ids: state.ids.concat(Object.keys(action.reportbacks)),
        entities: merge(state.entities, action.reportbacks),
        itemEntities: merge(state.itemEntities, action.reportbackItems),
      };

    case REACTION_CHANGED:
      return update(state, {
        itemEntities: {
          [action.reportbackItemId]: {
            reaction: {
              reacted: {$set: action.value},
              total: {$set: state.itemEntities[action.reportbackItemId].reaction.total + (action.value ? 1 : -1)},
            }
          }
        }
      });

    case REACTION_COMPLETE:
      return update(state, {
        itemEntities: {
          [action.reportbackItemId]: {
            reaction: {
              id: {$set: action.reactionId},
            },
          }
        }
      });

    default:
      return state;
  }
}

export default reportbacks;

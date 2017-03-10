import { USER_LIKED_REPORTBACK, USER_UNLIKED_REPORTBACK } from '../actions';
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
            reacted: {$set: true},
          }
        }
      });

    case USER_UNLIKED_REPORTBACK:
      return update(state, {
        data: {
          [action.reportbackItemId]: {
            reacted: {$set: false},
          }
        }
      });

    default:
      return state;
  }
}

export default reactions;

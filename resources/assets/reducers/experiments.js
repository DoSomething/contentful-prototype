import {
  ADD_TO_EXPERIMENTS_STORE,
  UPDATE_EXPERIMENTS_STORE,
} from '../actions';

/**
 * Experiments reducer:
 */
const experiments = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_EXPERIMENTS_STORE: {
      const experimentsState = {};

      experimentsState[action.name] = null;

      return Object.assign({}, state, experimentsState);
    }

    case UPDATE_EXPERIMENTS_STORE: {
      const experimentsState = {};

      experimentsState[action.name] = action.alternative;

      return Object.assign({}, state, experimentsState);
    }

    default:
      return state;
  }
};

export default experiments;

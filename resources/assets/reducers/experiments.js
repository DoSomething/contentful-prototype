import {
  EXPERIMENT_ADD_TEST_TO_STORE,
  EXPERIMENT_UPDATE_TEST_IN_STORE,
} from '../constants/action-types';

/**
 * Experiments reducer:
 */
const experiments = (state = {}, action) => {
  switch (action.type) {
    case EXPERIMENT_ADD_TEST_TO_STORE: {
      const experimentsState = {};

      experimentsState[action.name] = null;

      return Object.assign({}, state, experimentsState);
    }

    case EXPERIMENT_UPDATE_TEST_IN_STORE: {
      const experimentsState = {};

      experimentsState[action.name] = action.alternative;

      return Object.assign({}, state, experimentsState);
    }

    default:
      return state;
  }
};

export default experiments;

import {
  EXPERIMENT_INIT_PARTICIPATION,
  EXPERIMENT_ADD_TEST_TO_STORE,
  EXPERIMENT_UPDATE_TEST_IN_STORE,
  EXPERIMENT_CONVERT_ON_TEST,
} from '../constants/action-types';

export function convertExperiment(name) {
  return dispatch => {
    dispatch({
      type: EXPERIMENT_CONVERT_ON_TEST,
      name,
    });
  };
}

export function participateInExperiment(name) {
  return dispatch => {
    dispatch({
      type: EXPERIMENT_INIT_PARTICIPATION,
      name,
    });
  };
}

export function addToStore(name) {
  return dispatch => {
    dispatch({
      type: EXPERIMENT_ADD_TEST_TO_STORE,
      name,
    });
  };
}

export function updateStore(name, alternative) {
  return dispatch => {
    dispatch({
      type: EXPERIMENT_UPDATE_TEST_IN_STORE,
      name,
      alternative,
    });
  };
}

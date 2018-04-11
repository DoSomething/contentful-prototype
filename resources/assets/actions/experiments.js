import {
  PARTICIPATE_IN_EXPERIMENT,
  ADD_TO_EXPERIMENTS_STORE,
  UPDATE_EXPERIMENTS_STORE,
  CONVERT_EXPERIMENT,
} from '../actions';

export function convertExperiment(name) {
  return dispatch => {
    dispatch({
      type: CONVERT_EXPERIMENT,
      name,
    });
  };
}

export function participateInExperiment(name) {
  return dispatch => {
    dispatch({
      type: PARTICIPATE_IN_EXPERIMENT,
      name,
    });
  };
}

export function addToStore(name) {
  return dispatch => {
    dispatch({
      type: ADD_TO_EXPERIMENTS_STORE,
      name,
    });
  };
}

export function updateStore(name, alternative) {
  return dispatch => {
    dispatch({
      type: UPDATE_EXPERIMENTS_STORE,
      name,
      alternative,
    });
  };
}

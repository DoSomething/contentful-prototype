import { addToStore } from '../actions';
import { EXPERIMENT_INIT_PARTICIPATION } from '../constants/action-types';

const experimentsMiddleware = ({ getState, dispatch }) => next => action => {
  const state = getState();

  if (action.type === EXPERIMENT_INIT_PARTICIPATION) {
    if (!Object.prototype.hasOwnProperty.call(state.experiments, action.name)) {
      dispatch(addToStore(action.name));
    }
  }

  return next(action); // eslint-disable-line consistent-return
};

export default experimentsMiddleware;

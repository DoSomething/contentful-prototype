import { PARTICIPATE_IN_EXPERIMENT, addToStore } from '../actions';

const experimentsMiddleware = ({ getState, dispatch }) => next => action => {
  const state = getState();

  if (action.type === PARTICIPATE_IN_EXPERIMENT) {
    if (!Object.prototype.hasOwnProperty.call(state.experiments, action.name)) {
      dispatch(addToStore(action.name));
    }
  }

  return next(action); // eslint-disable-line consistent-return
};

export default experimentsMiddleware;

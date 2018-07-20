import {
  EXPERIMENT_INIT_PARTICIPATION,
  EXPERIMENT_CONVERT_ON_TEST,
} from '../constants/action-types';
import { addToStore, updateStore } from '../actions';
import { participate, convert } from '../helpers/experiments';

const experimentsMiddleware = ({ getState, dispatch }) => next => action => {
  console.log('2️⃣');

  const state = getState();

  if (action.type === EXPERIMENT_INIT_PARTICIPATION) {
    participate(action.name).then(alternative => {
      dispatch(updateStore(action.name, alternative));
    });

    // @TODO: yes it is weird to me that the addToStore is called after updateStore.
    // Do not recall why this was the case (the experimentsApiMiddleware would get called
    // before this middleware so that is the execution order I followed when consolidating).
    // This will get cleaned up with upcoming pull request!
    if (!Object.prototype.hasOwnProperty.call(state.experiments, action.name)) {
      dispatch(addToStore(action.name));
    }
  }

  if (action.type === EXPERIMENT_CONVERT_ON_TEST) {
    convert(action.name).then(() => {
      // @TODO: maybe call an action to signify conversion on experiment.
      // Not sure if we want to use the return from the Promise.
    });
  }

  return next(action);
};

export default experimentsMiddleware;

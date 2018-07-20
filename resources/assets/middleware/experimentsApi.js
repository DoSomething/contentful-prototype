import {
  EXPERIMENT_INIT_PARTICIPATION,
  EXPERIMENT_CONVERT_ON_TEST,
} from '../constants/action-types';
import { updateStore } from '../actions';
import { participate, convert } from '../helpers/sixpack';

const experimentsApiMiddleware = ({ dispatch }) => next => action => {
  if (action.type === EXPERIMENT_INIT_PARTICIPATION) {
    participate(action.name).then(alternative => {
      dispatch(updateStore(action.name, alternative));
    });
  }

  if (action.type === EXPERIMENT_CONVERT_ON_TEST) {
    convert(action.name).then(() => {
      // @TODO: maybe call an action to signify conversion on experiment.
      // Not sure if we want to use the return from the Promise.
    });
  }

  return next(action);
};

export default experimentsApiMiddleware;

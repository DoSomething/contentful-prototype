import {
  PARTICIPATE_IN_EXPERIMENT,
  CONVERT_EXPERIMENT,
  updateStore,
} from '../actions';
import { participate, convert } from '../helpers/sixpack';

const experimentsApiMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === PARTICIPATE_IN_EXPERIMENT) {
    participate(action.name).then((alternative) => {
      dispatch(updateStore(action.name, alternative));
    });
  }

  if (action.type === CONVERT_EXPERIMENT) {
    convert(action.name).then(() => {
      // @TODO: maybe call an action to signify conversion on experiment.
      // Not sure if we want to use the return from the Promise.
    });
  }

  return next(action);
};

export default experimentsApiMiddleware;

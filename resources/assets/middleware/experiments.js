import { get } from 'lodash';
import {
  PARTICIPATE_IN_EXPERIMENT,
  addToStore,
} from '../actions';
import experimentsDefinitions from '../experiments.json';
import { assertConditionPasses } from '../helpers/experiments';

const experimentsMiddleware = ({ getState, dispatch }) => next => (action) => {
  const state = getState();

  if (action.type === PARTICIPATE_IN_EXPERIMENT) {
    // Are there any conditions that need to pass for current experiment to execute?
    const condition = get(experimentsDefinitions[action.name], 'meta.condition', null);

    if (condition && ! assertConditionPasses(condition, state)) {
      return;
    }

    if (! Object.prototype.hasOwnProperty.call(state.experiments, action.name)) {
      dispatch(addToStore(action.name));
    }
  }

  return next(action); // eslint-disable-line consistent-return
};

export default experimentsMiddleware;

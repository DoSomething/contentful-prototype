import { AFFIRMATION_OPEN, AFFIRMATION_CLOSE } from '../actions';

/**
 * Affirmation reducer:
 */
const affirmation = (state = {}, action) => {
  switch (action.type) {
    case AFFIRMATION_OPEN:
      return {...state, open: true};

    case AFFIRMATION_CLOSE:
      return {...state, open: false};

    default:
      return state;
  }
}

export default affirmation;

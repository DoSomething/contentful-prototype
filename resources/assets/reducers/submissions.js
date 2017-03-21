import {
  STORE_REPORTBACK_PENDING,
  STORE_REPORTBACK_SUCCESSFUL,
  ADD_TO_SUBMISSIONS_LIST
} from '../actions/reportbackActions';

/**
 * Submissions reducer:
 */
const submissions = (state = {}, action) => {
  switch (action.type) {
    case STORE_REPORTBACK_PENDING:
      return {...state, isStoring: true};

    case STORE_REPORTBACK_SUCCESSFUL:
      return {...state, isStoring: false};

    case ADD_TO_SUBMISSIONS_LIST:
      return Object.assign({}, state, {
        data: [...state.data, action.reportback]
      })

    default:
      return state;
  }
}

export default submissions;

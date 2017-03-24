import {
  REQUESTED_USER_SUBMISSIONS,
  REQUESTED_USER_SUBMISSIONS_FAILED,
  RECEIVED_USER_SUBMISSIONS,
  STORE_REPORTBACK_PENDING,
  STORE_REPORTBACK_SUCCESSFUL,
  ADD_TO_SUBMISSIONS_LIST
} from '../actions';

/**
 * Submissions reducer:
 */
const submissions = (state = {}, action) => {
  switch (action.type) {
    case REQUESTED_USER_SUBMISSIONS:
      return {...state, isFetching: true};

    case REQUESTED_USER_SUBMISSIONS_FAILED:
      // @TODO: add errors?
      return {...state, isFetching: false};

    case RECEIVED_USER_SUBMISSIONS:
      return {...state, isFetching: false};

    case STORE_REPORTBACK_PENDING:
      return {...state, isStoring: true};

    case STORE_REPORTBACK_SUCCESSFUL:
      return {...state, isStoring: false};

    case ADD_TO_SUBMISSIONS_LIST:
      return {...state, data: [action.reportback, ...state.data]}

    default:
      return state;
  }
}

export default submissions;

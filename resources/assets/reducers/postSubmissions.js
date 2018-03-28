import {
  POST_SUBMISSION_PENDING,
  POST_SUBMISSION_FAILED,
  POST_SUBMISSION_SUCCESSFUL,
} from '../constants/action-types';

/**
 * Post Submissions reducer.
 */
const postSubmissions = (state = {}, action) => {
  switch (action.type) {
    case POST_SUBMISSION_PENDING:
      return { ...state, isPending: true };

    case POST_SUBMISSION_FAILED:
      console.log('🤗 from the reducer!');
      console.log(action.response);
      return {
        ...state,
        isPending: false,
      };

    case POST_SUBMISSION_SUCCESSFUL:
      console.log('🤗 from the reducer!');
      console.log(action.response);
      return {
        ...state,
        isPending: false,
      };

    default:
      return state;
  }
};

export default postSubmissions;

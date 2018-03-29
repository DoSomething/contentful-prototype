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
      return {
        ...state,
        isPending: false,
        items: {
          [action.meta.id]: {
            data: null,
            status: action.response,
            type: action.meta.type,
          },
        },
      };

    case POST_SUBMISSION_SUCCESSFUL:
      return {
        ...state,
        isPending: false,
        items: {
          [action.meta.id]: {
            data: action.response.data,
            status: action.response.status,
            type: action.meta.type,
          },
        },
      };

    default:
      return state;
  }
};

export default postSubmissions;

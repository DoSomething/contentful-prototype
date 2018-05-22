import { has } from 'lodash';

import {
  POST_SUBMISSION_APPEND_ITEM,
  POST_SUBMISSION_RESET_ITEM,
  POST_SUBMISSION_FAILED,
  POST_SUBMISSION_PENDING,
  POST_SUBMISSION_SUCCESSFUL,
} from '../constants/action-types';

/**
 * Post Submissions reducer.
 */
const postSubmissions = (state = {}, action) => {
  switch (action.type) {
    case POST_SUBMISSION_APPEND_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: {
            isPending: false,
          },
        },
      };

    case POST_SUBMISSION_RESET_ITEM:
      if (has(state, `items.${action.id}`)) {
        return {
          ...state,
          items: {
            ...state.items,
            [action.id]: {
              isPending: false,
            },
          },
        };
      }

      return state;

    case POST_SUBMISSION_FAILED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.meta.id]: {
            isPending: false,
            data: null,
            status: action.response,
            type: action.meta.type,
          },
        },
      };

    case POST_SUBMISSION_PENDING:
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: {
            isPending: true,
          },
        },
      };

    case POST_SUBMISSION_SUCCESSFUL:
      return {
        ...state,
        items: {
          ...state.items,
          [action.meta.id]: {
            isPending: false,
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

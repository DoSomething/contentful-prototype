import {
  PICK_QUIZ_ANSWER,
  COMPARE_QUIZ_ANSWER,
  VIEW_QUIZ_RESULT,
  LOAD_PREVIOUS_QUIZ_STATE,
  QUIZ_ERROR,
} from '../actions';

const ensureSafeState = (state, quizId) => {
  if (! state[quizId]) {
    return {
      ...state,
      [quizId]: {},
    };
  }

  return state;
};

const quiz = (state = {}, action) => {
  const { quizId, resultActionId } = action;
  const safeState = ensureSafeState(state, quizId);

  switch (action.type) {
    case LOAD_PREVIOUS_QUIZ_STATE:
      return {
        ...safeState,
        [quizId]: {
          questions: action.questions,
        },
      };
    case PICK_QUIZ_ANSWER:
      return {
        ...safeState,
        [quizId]: {
          ...safeState[quizId],
          error: null,
          questions: {
            ...safeState[quizId].questions,
            [action.questionId]: action.answerId,
          },
        },
      };
    case VIEW_QUIZ_RESULT:
      return {
        ...safeState,
        [quizId]: {
          ...safeState[quizId],
          shouldSeeResult: true,
          selectedResult: resultActionId,
        },
      };
    case COMPARE_QUIZ_ANSWER:
      return {
        ...safeState,
        [quizId]: {
          ...safeState[quizId],
          shouldSeeResult: true,
          shouldCompare: true,
        },
      };
    case QUIZ_ERROR:
      return {
        ...safeState,
        [quizId]: {
          ...safeState[quizId],
          error: action.error,
        },
      };
    default: return state;
  }
};

export default quiz;

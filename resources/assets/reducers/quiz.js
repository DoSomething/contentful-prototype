import {
  PICK_QUIZ_ANSWER,
  COMPARE_QUIZ_ANSWER,
  QUIZ_INIT,
  QUIZ_ERROR,
} from '../actions';

const quiz = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_INIT:
      return {
        ...state,
        [action.quizId]: {
          questions: {},
          shouldCompare: false,
          error: null,
        },
      };
    case PICK_QUIZ_ANSWER:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          error: null,
          questions: {
            ...state[action.quizId].questions,
            [action.questionId]: action.award,
          },
        },
      };
    case COMPARE_QUIZ_ANSWER:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          shouldCompare: true,
        },
      };
    case QUIZ_ERROR:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          error: action.error,
        },
      };
    default: return state;
  }
};

export default quiz;

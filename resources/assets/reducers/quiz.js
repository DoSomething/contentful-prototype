import {
  PICK_QUIZ_ANSWER,
  COMPARE_QUIZ_ANSWER,
  VIEW_QUIZ_RESULT,
  START_QUIZ,
  QUIZ_ERROR,
} from '../actions';

const quiz = (state = {}, action) => {
  switch (action.type) {
    case START_QUIZ:
      // TODO: Load in data from action if exists. Will need this for the conversion work.
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
    case VIEW_QUIZ_RESULT:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          shouldSeeResult: true,
        },
      };
    case COMPARE_QUIZ_ANSWER:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          shouldSeeResult: true,
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

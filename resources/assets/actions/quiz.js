import { find } from 'lodash';
import {
  PICK_QUIZ_ANSWER,
  COMPARE_QUIZ_ANSWER,
  VIEW_QUIZ_RESULT,
  QUIZ_INIT,
  QUIZ_ERROR,
} from '../actions';

export function quizInit(quizId) {
  return { type: QUIZ_INIT, quizId };
}

export function pickQuizAnswer(quizId, questionId, award) {
  return { type: PICK_QUIZ_ANSWER, quizId, questionId, award };
}

export function quizError(quizId, error) {
  return { type: QUIZ_ERROR, quizId, error };
}

export function viewQuizResult(quizId) {
  return ((dispatch, getState) => {
    const quizData = getState().quiz[quizId];
    const quizContent = find(getState().campaign.quizzes, { id: quizId });

    const totalAnswers = Object.values(quizData.questions).length;
    const totalQuestions = quizContent.fields.questions.length;

    if (totalAnswers < totalQuestions) {
      return dispatch(quizError(quizId, 'You\'re missing a question!'));
    }

    return dispatch({ type: VIEW_QUIZ_RESULT, quizId });
  });
}

export function compareQuizAnswer(quizId) {
  return { type: COMPARE_QUIZ_ANSWER, quizId }; // TODO
}

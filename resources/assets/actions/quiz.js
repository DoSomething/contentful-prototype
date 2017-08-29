/* global document */

import { find } from 'lodash';
import {
  clickedSignUp,
  queueEvent,
  PICK_QUIZ_ANSWER,
  COMPARE_QUIZ_ANSWER,
  VIEW_QUIZ_RESULT,
  LOAD_PREVIOUS_QUIZ_STATE,
  QUIZ_ERROR,
} from '../actions';
import { QUIZ_STORAGE_KEY, set, get, remove } from '../helpers/storage';

export function loadPreviousQuizState(quizId, questions) {
  return { type: LOAD_PREVIOUS_QUIZ_STATE, quizId, questions };
}

export function pickQuizAnswer(quizId, questionId, answerId) {
  return { type: PICK_QUIZ_ANSWER, quizId, questionId, answerId };
}

export function quizError(quizId, error) {
  return { type: QUIZ_ERROR, quizId, error };
}

export function viewQuizResult(quizId) {
  return { type: VIEW_QUIZ_RESULT, quizId };
}

export function quizConvert(quizId) {
  return ((dispatch, getState) => {
    // If the user is not logged in, handle this action later.
    if (! getState().user.id) {
      const quizData = getState().quiz[quizId];
      set(quizId, QUIZ_STORAGE_KEY, quizData.questions);

      return dispatch(queueEvent('quizConvert', quizId));
    }

    // Load questions from previous state if available
    const questions = get(quizId, QUIZ_STORAGE_KEY);
    if (questions) {
      dispatch(loadPreviousQuizState(quizId, questions));
      remove(quizId, QUIZ_STORAGE_KEY);
    }

    const campaignId = getState().campaign.legacyCampaignId;
    dispatch(clickedSignUp(campaignId, { source: 'quiz' }, false));

    return dispatch(viewQuizResult(quizId));
  });
}

export function completeQuiz(quizId) {
  return ((dispatch, getState) => {
    const quizData = getState().quiz[quizId];
    const quizContent = find(getState().campaign.quizzes, { id: quizId });

    const totalAnswers = (quizData && quizData.questions) ?
      Object.values(quizData.questions).length : 0;
    const totalQuestions = quizContent.fields.questions.length;

    if (totalAnswers < totalQuestions) {
      return dispatch(quizError(quizId, 'You\'re missing a question!'));
    }

    document.querySelector('.main').scrollIntoView(true);
    return dispatch(quizConvert(quizId));
  });
}

// TODO: Refactor based on A/B test.
export function compareQuizAnswer(quizId) {
  return { type: COMPARE_QUIZ_ANSWER, quizId };
}

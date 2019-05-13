/* global document */

import { find, get } from 'lodash';

import {
  storeCampaignSignup,
  PICK_QUIZ_ANSWER,
  COMPARE_QUIZ_ANSWER,
  VIEW_QUIZ_RESULT,
  LOAD_PREVIOUS_QUIZ_STATE,
  QUIZ_ERROR,
} from '.';
import { isAuthenticated } from '../selectors/user';

export function loadPreviousQuizState(quizId, questions) {
  return { type: LOAD_PREVIOUS_QUIZ_STATE, quizId, questions };
}

export function pickQuizAnswer(quizId, questionId, answerId) {
  return { type: PICK_QUIZ_ANSWER, quizId, questionId, answerId };
}

export function quizError(quizId, error) {
  return { type: QUIZ_ERROR, quizId, error };
}

export function viewQuizResult(quizId, resultActionId) {
  return { type: VIEW_QUIZ_RESULT, quizId, resultActionId };
}

export function quizConvert(quizId, resultActionId) {
  return (dispatch, getState) => {
    const campaignId = getState().campaign.campaignId;

    dispatch(
      storeCampaignSignup(campaignId, {
        body: { details: { source: 'quiz' } },
      }),
    );

    return dispatch(viewQuizResult(quizId, resultActionId));
  };
}

export function completeQuiz(quizId) {
  return (dispatch, getState) => {
    const quizData = getState().quiz[quizId];
    const quizContent = find(getState().campaign.quizzes, { id: quizId });

    const totalAnswers =
      quizData && quizData.questions
        ? Object.values(quizData.questions).length
        : 0;

    const totalQuestions = quizContent.fields.questions.length;

    if (totalAnswers < totalQuestions) {
      return dispatch(quizError(quizId, "You're missing a question!"));
    }

    document.querySelector('.main').scrollIntoView(true);

    // @HACK: Here we go! For the first question, grab the answer, if it is equal to 0,
    // we show a share action since user is under age, otherwise we show a link action.
    const firstAnswer = Number(quizData.questions[0]);
    const resultActionType = firstAnswer === 0 ? 'shareAction' : 'linkAction';
    const resultActionId = get(
      quizContent.fields.resultActions,
      resultActionType,
      null,
    );

    const state = getState();
    return isAuthenticated(state)
      ? dispatch(quizConvert(quizId, resultActionId))
      : dispatch(viewQuizResult(quizId, resultActionId));
  };
}

// TODO: Refactor based on A/B test.
export function compareQuizAnswer(quizId) {
  return { type: COMPARE_QUIZ_ANSWER, quizId };
}

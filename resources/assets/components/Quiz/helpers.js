/* global window */
import { find, get } from 'lodash';

/**
 * Tally the amount of times a quiz result content and result block
 * have been opted for via a users choice selection for quiz questions, and
 * return the result opted for the most.
 *
 * @param  {Object}   selections
 * @param  {Array}   questions
 * @return {Object}
 */
export const calculateResult = (
  selections,
  questions,
  results,
  resultBlocks,
) => {
  const talliedResults = {};
  const talliedResultBlocks = {};

  questions.forEach(question => {
    // find the choice the user selected for the current question
    const selectedChoiceId = selections[question.id];
    const selectedChoice = question.choices[selectedChoiceId];

    // increment the counter for each result of the selected choice
    const resultIds = selectedChoice.results;
    resultIds.forEach(
      resultId =>
        // ensuring a default value of zero for unset result properties
        (talliedResults[resultId] = (talliedResults[resultId] || 0) + 1),
    );

    const resultBlockId = selectedChoice.resultBlock;
    // ensuring a default value of zero for unset result properties
    if (resultBlockId) {
      talliedResultBlocks[resultBlockId] =
        (talliedResultBlocks[resultBlockId] || 0) + 1;
    }
  });

  // sorts results by their selection counter in descending order
  const resultId = Object.keys(talliedResults).sort(
    (resultA, resultB) => talliedResults[resultB] - talliedResults[resultA],
  )[0];

  const result = resultId ? find(results, { id: resultId }) : null;

  // sorts results by their selection counter in descending order
  const resultBlockId = Object.keys(talliedResultBlocks).sort(
    (blockA, blockB) =>
      talliedResultBlocks[blockB] - talliedResultBlocks[blockA],
  )[0];

  const resultBlock = resultBlockId
    ? find(resultBlocks, { id: resultBlockId })
    : null;

  return { result, resultBlock };
};

export const resultParams = (resultId, resultBlockId) =>
  `resultId=${resultId}&resultBlockId=${resultBlockId}&showResults=true`;

export const appendResultParams = results => {
  const resultId = get(results, 'result.id');
  const resultBlockId = get(results, 'resultBlock.id');

  // Add result params to persist the quiz results to follow an unauthenticated user login flow
  const params = window.location.search ? `${window.location.search}&` : '?';
  const quizResultParams = params + resultParams(resultId, resultBlockId);

  window.history.pushState(window.history.state, '', quizResultParams);
};

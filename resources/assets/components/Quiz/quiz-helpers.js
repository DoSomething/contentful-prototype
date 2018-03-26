/**
 * Tally the amount of times a quiz result content and result block
 * have been opted for via a users choice selection for quiz questions, and
 * return the result opted for the most.
 *
 * @param  {Object}   selections
 * @param  {Array}   questions
 * @return {Object}
 */
const calculateResult = (selections, questions) => {
  const talliedResults = {};
  const talliedResultBlocks = {};

  questions.forEach((question) => {
    // find the choice the user selected for the current question
    const selectedChoiceId = selections[question.id];
    const selectedChoice = question.choices[selectedChoiceId];

    // increment the counter for each result of the selected choice
    const results = selectedChoice.results;
    results.forEach(resultId => (
      // ensuring a default value of zero for unset result properties
      talliedResults[resultId] = (talliedResults[resultId] || 0) + 1
    ));

    const resultBlockId = selectedChoice.resultBlock;
    // ensuring a default value of zero for unset result properties
    if (resultBlockId) {
      talliedResultBlocks[resultBlockId] = (talliedResultBlocks[resultBlockId] || 0) + 1;
    }
  });

  // sorts results by their selection counter in descending order
  const resultId = Object.keys(talliedResults).sort((resultA, resultB) => (
    talliedResults[resultB] - talliedResults[resultA]
  ))[0];

  // sorts results by their selection counter in descending order
  const resultBlockId = Object.keys(talliedResultBlocks).sort((blockA, blockB) => (
    talliedResultBlocks[blockB] - talliedResultBlocks[blockA]
  ))[0];

  return { resultId, resultBlockId };
};

export default calculateResult;

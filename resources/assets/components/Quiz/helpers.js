import { find, random } from 'lodash';

export const pickWinner = (responses, questions) => {
  const finalTallies = Object.keys(responses).reduce((currentTallies, questionId) => {
    const { answers } = find(questions, { id: questionId });
    if (! answers) {
      return currentTallies;
    }

    const answerId = responses[questionId];

    let { awards } = find(answers, { id: answerId });
    if (! awards) {
      return currentTallies;
    }

    // Handle single award string.
    if (! Array.isArray(awards)) {
      awards = [awards];
    }

    const newTallies = { ...currentTallies };

    awards.forEach(award => (
      newTallies[award] = (newTallies[award] || 0) + 1
    ));

    return newTallies;
  }, {});

  return Object.keys(finalTallies).sort((alpha, beta) => (
    finalTallies[beta] - finalTallies[alpha]
  ))[0];
};

export const replaceStringWithWinner = (string, winner) => (
  string.replace(/{{winner}}/g, winner)
);

export const replaceStringWithPercent = string => (
  string.replace(/{{percent}}/g, `${random(25, 34)}%`)
);

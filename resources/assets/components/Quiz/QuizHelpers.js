import { random } from 'lodash';
import { findById } from '../../helpers';

export const pickWinner = (responses, questions) => {
  const finalTallies = Object.keys(responses).reduce((currentTallies, questionId) => {
    const { answers } = findById(questions, questionId);
    if (! answers) {
      return currentTallies;
    }

    const answerId = responses[questionId];

    let { awards } = findById(answers, answerId);
    if (! awards) {
      return currentTallies;
    }

    // Handle single award string.
    if (! Array.isArray(awards)) {
      awards = [awards];
    }

    const newTallies = { ...currentTallies };

    awards.forEach(award => (
      newTallies[award] = newTallies[award] ? newTallies[award] + 1 : 1
    ));

    return newTallies;
  }, {});

  return Object.keys(finalTallies).sort((alpha, beta) => (
    finalTallies[alpha] - finalTallies[beta]
  ))[0];
};

export const replaceStringWithWinner = (string, winner) => (
  string.replace(/{{winner}}/g, winner)
);

export const replaceStringWithPercent = string => (
  string.replace(/{{percent}}/g, `${random(25, 34)}%`)
);

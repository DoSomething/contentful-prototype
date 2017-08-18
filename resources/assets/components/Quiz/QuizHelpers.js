import { findById, getRandomInt } from '../../helpers';

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
export const pickWinner = (responses, questions) => {
  const tallies = {};

  for (const questionId of Object.keys(responses)) {
    const { answers } = findById(questions, questionId);
    if (! answers) {
      continue;
    }

    const answerId = responses[questionId];
    let { awards } = findById(answers, answerId);
    if (! awards) {
      continue;
    }

    // Handle single award string.
    if (! Array.isArray(awards)) {
      awards = [awards];
    }

    // Increment tally for this award
    for (const value of awards) {
      if (! tallies[value]) {
        tallies[value] = 0;
      }

      tallies[value] += 1;
    }
  }

  return Object.keys(tallies).sort((a, b) => ( // eslint-disable-line id-length
    tallies[a] - tallies[b]
  ))[0];
};

export const replaceStringWithWinner = (string, winner) => (
  string.replace(/{{winner}}/g, winner)
);

export const replaceStringWithPercent = string => (
  string.replace(/{{percent}}/g, `${getRandomInt(25, 34)}%`)
);

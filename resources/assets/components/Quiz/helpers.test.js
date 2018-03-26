import calculateResult from './helpers';

const questions = [
  {
    id: '0',
    choices: [
      { id: '0', results: ['0', '1'], resultBlock: '1234' },
      { id: '1', results: ['1', '2'], resultBlock: '2345' },
      { id: '2', results: ['0'], resultBlock: '2345' },
    ],
  },
  {
    id: '1',
    choices: [
      { id: '0', results: ['0', '1'] },
      { id: '1', results: ['1', '2'] },
      { id: '2', results: ['0'] },
    ],
  },
];

const selections = { 0: '0', 1: '1' };

test('it tallies the results and returns the one with the most selections', () => {
  const expectedResult = { resultId: '1', resultBlockId: '1234' };
  expect(calculateResult(selections, questions)).toEqual(expectedResult);
});

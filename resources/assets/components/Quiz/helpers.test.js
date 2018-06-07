import { calculateResult } from './helpers';

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

const results = [{ id: '0' }, { id: '1' }, { id: '2' }];

const resultBlocks = [{ id: '1234' }];

test('it tallies the results and returns the ones with the most selections', () => {
  const expectedResult = { result: results[1], resultBlock: resultBlocks[0] };
  expect(calculateResult(selections, questions, results, resultBlocks)).toEqual(
    expectedResult,
  );
});

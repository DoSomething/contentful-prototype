import { calculateResult } from './Quiz';

const quiz = [
  {
    id: '0',
    choices: [
      { id: '0', resultBlock: '1234' },
      { id: '1', resultBlock: '3456' },
      { id: '2' },
    ],
  },
  {
    id: '1',
    choices: [
      { id: '0', resultBlock: '1234' },
      { id: '1', resultBlock: '2345' },
      { id: '2', resultBlock: '3456' },
      { id: '3' },
    ],
  },
  {
    id: '2',
    choices: [{ id: '0' }, { id: '1' }, { id: '2' }],
  },
];

test('it tallies the results and returns the ones with the most selections', () => {
  // Two choices for 1234, and one unspecified:
  expect(calculateResult({ 0: '0', 1: '1', 2: '1' }, quiz)).toEqual('1234');

  // One choice for 2345, and two unspecified:
  expect(calculateResult({ 0: '2', 1: '1', 2: '0' }, quiz)).toEqual('2345');

  // All unspecified, so "no" result:
  expect(calculateResult({ 0: '2', 1: '3', 2: '0' }, quiz)).toBeUndefined();
});

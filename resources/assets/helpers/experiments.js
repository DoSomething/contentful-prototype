/* eslint-disable import/prefer-default-export */

import { get } from 'lodash';
import experimentsDefinitions from '../experiments.json';

/**
 * Check whether the app state fulfills the given test
 *
 * @param  {String} test
 * @param  {Object} state
 * @return {Boolean}
 */
export function assertTestPasses(test, state) {
  const schema = experimentsDefinitions[test].meta.preTest;
  const keys = Object.keys(schema);
  const values = Object.values(schema);

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const value = values[index];

    // Check if the test matches the app state.
    if (get(state, key, false) !== value) {
      return false;
    }
  }

  return true;
}

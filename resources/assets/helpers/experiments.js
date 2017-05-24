/* eslint-disable import/prefer-default-export */

import { get } from 'lodash';
import experimentsDefinitions from '../experiments.json';

/**
 * Confirm whether a specified condition passes for executing an experiment.
 *
 * @param  {String} condition
 * @param  {Object} state
 * @return {Boolean}
 */
export function assertConditionPasses(condition, state) {
  if (condition === 'unaffiliated') {
    return ! state.signups.thisCampaign;
  }

  // @TODO: Add additional conditions. Maybe break this function out into other file.
  return false;
}

/**
 * Check whether the app state is what the test should run on.
 *
 * @param  {String} test
 * @param  {Object} state
 * @return {Boolean}
 */
export function assertPreTestPasses(test, state) {
  const { preTest } = experimentsDefinitions[test].meta;
  const keys = Object.keys(preTest);
  const values = Object.values(preTest);

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const value = values[index];

    // Check if the test matches the app state.
    if (! get(state, key, false) === value) return false;
  }

  return true;
}

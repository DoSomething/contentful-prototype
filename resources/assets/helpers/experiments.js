/* eslint-disable import/prefer-default-export */

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

  if (condition === 'affiliated') {
    return state.signups.thisCampaign;
  }

  // @TODO: Add additional conditions. Maybe break this function out into other file.
  return false;
}

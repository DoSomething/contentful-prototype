/* eslint-disable import/prefer-default-export */

/**
 *
 * Get the total number of reportbacks loaded in the state.
 *
 * @param  {Object} state
 * @return {Integer}
 */
export const getTotalReportbacksInState = state => state.reportbacks.ids.length;

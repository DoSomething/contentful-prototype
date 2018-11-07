import { get } from 'lodash';

/**
 * Get the Campaign additional content from the state.
 *
 * @param  {Object} state
 * @return {Object}
 */
export function getCampaignAdditionalContent(state) {
  return get(state, 'campaign.additionalContent', {});
}

export default null;

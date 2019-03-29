import { get } from 'lodash';

import { contentfulImageUrl } from '../helpers';

/**
 * Get the Campaign additional content from the state.
 *
 * @param  {Object} state
 * @return {Object}
 */
export function getCampaignAdditionalContent(state) {
  return get(state, 'campaign.additionalContent', {});
}

/**
 * Get Campaign data to showcase campaign context in Northstar login interface.
 *
 * @param  {Object} state
 * @return {Object}
 */
export function getCampaignDataForNorthstar(state) {
  const data = {};

  if (get(state, 'campaign.type', null) === 'campaign') {
    data.callToAction = state.campaign.callToAction;
    data.coverImage = contentfulImageUrl(
      state.campaign.coverImage.url,
      '800',
      '600',
      'fill',
    );
    data.title = state.campaign.title;
  }

  return data;
}

export default null;

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

  if (state.campaign) {
    data.callToAction = encodeURIComponent(state.campaign.callToAction);
    data.coverImage = encodeURIComponent(
      contentfulImageUrl(state.campaign.coverImage.url, '800', '600', 'fill'),
    );
    data.title = encodeURIComponent(state.campaign.title);
  }

  return data;
}

export default null;

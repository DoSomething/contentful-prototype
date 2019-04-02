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
  if (get(state, 'campaign.type', null) !== 'campaign') {
    return {};
  }

  const { title, callToAction, coverImage } = state.campaign;

  return {
    title,
    callToAction,
    coverImage: contentfulImageUrl(coverImage.url, '800', '600', 'fill'),
  };
}

export default null;

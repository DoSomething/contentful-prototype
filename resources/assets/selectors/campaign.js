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

/**
 * Get flag to pass along to data and messaging related to affiliate messaging.
 *
 * @param  {Object} state
 * @return {String|Null}
 */
export function getCampaignAffiliateMessagingOptOutFlag(state) {
  const additionalContent = getCampaignAdditionalContent(state);

  // Is opt-out displayed on campaign?
  const displayAffilitateOptOut = get(
    additionalContent,
    'displayAffilitateOptOut',
    false,
  );

  if (!displayAffilitateOptOut) {
    return null;
  }

  // User's preference whether to opt-out or opt-in.
  return get(state, 'signups.affiliateMessagingOptOut', false)
    ? 'affiliate-opt-out'
    : null;
}

export default null;

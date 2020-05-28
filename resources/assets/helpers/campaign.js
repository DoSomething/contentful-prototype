import { join } from 'path';
import get from 'lodash/get';

/**
 * Prepare a campaign subpage's slug.
 *
 * @param  {String} campaignSlug
 * @param  {String} pageSlug
 * @return {String}
 */
export function prepareCampaignPageSlug(campaignSlug, pageSlug) {
  const missingCampaignSlug = pageSlug.indexOf(campaignSlug) < 0;

  if (missingCampaignSlug) {
    return join('/us/campaigns', campaignSlug, pageSlug);
  }

  return join('/us/campaigns', pageSlug);
}

/**
 * Get the Campaign.
 *
 * @return {String|Undefined}
 */
export const getCampaign = () => get(window.STATE, 'campaign');

export default null;

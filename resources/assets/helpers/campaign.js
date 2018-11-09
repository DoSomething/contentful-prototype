/* global window */

import { join } from 'path';
import { has } from 'lodash';

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
 * Build redirect URL from Campaign to login with Campaign information.
 *
 * @param  {Null|Object} campaignData
 * @return {String}
 */
export function buildCampaignLoginRedirectUrl(campaignData = null) {
  let url = `${window.location.origin}/next/login`;

  if (campaignData) {
    url += `?jsonOptions=${JSON.stringify(campaignData)}`;
  }

  return url;
}

export default null;

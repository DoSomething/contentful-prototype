/* eslint-disable import/prefer-default-export */

import { join } from 'path';

export function prepareCampaignPageSlug(campaignSlug, pageSlug) {
  const missingCampaignSlug = pageSlug.indexOf(campaignSlug) < 0;

  if (missingCampaignSlug) {
    return join('/us/campaigns', campaignSlug, pageSlug);
  }

  return join('/us/campaigns', pageSlug);
}

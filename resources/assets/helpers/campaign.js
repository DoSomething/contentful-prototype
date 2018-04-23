/* eslint-disable import/prefer-default-export */

import { join } from 'path';

export function prepareCampaignPageSlugs(campaignSlug, pageSlugs) {
  return pageSlugs.map(slug => {
    const missingCampaignSlug = slug.indexOf(campaignSlug) < 0;

    if (missingCampaignSlug) {
      return join('/us/campaigns', campaignSlug, slug);
    }

    return join('/us/campaigns', slug);
  });
}

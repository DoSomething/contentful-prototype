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

/**
 * Get path to Campaign FAQ page.
 *
 * @return {String|Undefined}
 */
export function getCampaignFaqPath() {
  const campaign = getCampaign();

  if (!campaign) {
    return undefined;
  }

  // Find the FAQ page & grab its slug value.
  const faqsSlug = get(
    campaign.pages.find(page => get(page, 'fields.slug', '').match(/faqs?$/)),
    'fields.slug',
  );

  // If found, return fully formed path to the FAQs page.
  return faqsSlug ? `/us/campaigns/${faqsSlug}` : undefined;
}

export default null;

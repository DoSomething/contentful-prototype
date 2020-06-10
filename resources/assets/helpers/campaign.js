import { join } from 'path';
import get from 'lodash/get';
import gql from 'graphql-tag';

import { getUserId } from './auth';

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
  const faqSlug = get(
    campaign.pages.find(page =>
      get(page, 'fields.slug', '')
        // Matches a page with an ".../faq" or ".../faqs" slug.
        .match(/faqs?$/),
    ),
    'fields.slug',
  );

  // If found, return fully formed path to the FAQ page.
  return faqSlug ? `/us/campaigns/${faqSlug}` : undefined;
}

export const campaignSignupGqlQuery = gql`
  query CampaignSignup($userId: String!, $campaignId: String!) {
    signups(userId: $userId, campaignId: $campaignId) {
      id
      group {
        id
        name
      }
    }
  }
`;

export function getCampaignSignupGqlQueryVariables() {
  return {
    userId: getUserId(),
    campaignId: getCampaign().campaignId,
  };
}

export default null;

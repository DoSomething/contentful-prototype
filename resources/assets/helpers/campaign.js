/* global window */

import { join } from 'path';
import gql from 'graphql-tag';
import { isBefore } from 'date-fns';
import { find, get, groupBy } from 'lodash';

import { getUserId } from './auth';

export const CAMPAIGN_SIGNUP_QUERY = gql`
  query CampaignSignupQuery($userId: String!, $campaignId: String!) {
    signups(userId: $userId, campaignId: $campaignId) {
      id
      group {
        id
        goal
        name
        groupTypeId
        groupType {
          name
        }
      }
    }
  }
`;

export const SEARCH_USER_CAMPAIGN_QUERY = gql`
  query SearchUserCampaignQuery($userId: String!, $campaignId: String!) {
    signups(userId: $userId, campaignId: $campaignId) {
      id
      campaignId
    }
  }
`;

/**
 * Find an entry from within the campaign by given ID or Slug param.
 * (Returns false if not found).
 *
 * @param  {Object} state
 * @param  {String} identifier
 * @return {Object|Undefined}
 */
export function findContentfulEntryInCampaign(state, identifier) {
  const campaign = state.campaign;

  const contentfulEntries = [].concat(campaign.pages, campaign.quizzes);

  return find(
    contentfulEntries,
    entry =>
      entry.id === identifier || get(entry, 'fields.slug') === identifier,
  );
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

/**
 * Get a query variables for a campaign signup.
 *
 * @return {Object}
 */
export function getCampaignSignupQueryVariables() {
  return {
    userId: getUserId(),
    campaignId: getCampaign().campaignId,
  };
}

/**
 * Determine if a page is an 'Action' page.
 *
 * @param  {Object} page
 * @return {Boolean}
 */
export function isActionPage(page) {
  return page.type === 'page' && page.fields.slug.endsWith('action');
}

/**
 * Check if the given campaign is closed.
 *
 * @param  {String}  endDate
 * @return {Boolean}
 */
export function isCampaignClosed(endDate) {
  if (!endDate) {
    return false;
  }

  return isBefore(endDate, new Date());
}

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
 * Groups a users signups (input with accompanying campaigns, actions, and posts)
 * into "complete", "incomplete", and "expired" categories.
 *
 * @param  {Array} signups
 * @param  {Array} signups.posts
 * @param  {Array} signups.campaigns
 * @param  {Array} signups.campaigns.actions
 * @return {Object}
 */
export function groupUserCampaignSignups(signups) {
  return groupBy(signups, signup => {
    const actions = get(signup, 'campaign.actions', []);
    const posts = get(signup, 'posts', []);

    // Does this signup's campaign have an *reportback* Action qualifying for a scholarship entry?
    const campaignHasScholarshipAction = actions.find(
      action => action.scholarshipEntry && action.reportback,
    );

    // Does this user have a pending or accepted Post
    // for a *reportback* Action on this signup's campaign qualifying for a scholarship entry?
    const userHasScholarshipReportback = posts.find(
      post =>
        post.actionDetails.scholarshipEntry &&
        post.actionDetails.reportback &&
        ['PENDING', 'ACCEPTED'].includes(post.status),
    );

    // Does this user have a pending or accepted Post for a *reportback* Action on this signup's campaign?
    const userHasReportback = posts.find(
      post =>
        post.actionDetails.reportback &&
        ['PENDING', 'ACCEPTED'].includes(post.status),
    );

    // If the user has a relavant reportback for this signup's campaign, mark as "complete".
    if (
      (campaignHasScholarshipAction && userHasScholarshipReportback) ||
      userHasReportback
    ) {
      return 'complete';
    }

    // If the user doesn't have a relavant reportback - as long as the campaign is "evergreen" or still open,
    // mark as "incomplete".
    if (
      !signup.campaign.endDate ||
      !isCampaignClosed(signup.campaign.endDate)
    ) {
      return 'incomplete';
    }

    // Otherwise (the haven't reported back, and this campaign is closed so) mark as "expired".
    return 'expired';
  });
}

export default null;

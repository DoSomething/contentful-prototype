/**
 * This file may eventually turn into config variables to avoid hardcoding when to suppress.
 *
 * Because the SitewideBanner CTA is hardcoded to redirect to vote.dosomething.org, we want to hide
 * the banner on certain pages based on content, or when authenticated user is already registered or
 * ineligible to vote.
 */

// An asterik can be used to exclude all children of a path, e.g. /us/campaigns/ready-vote/*
export const excludedPaths = [
  '/us/campaigns/ready-vote',
  '/us/campaigns/ready-vote/*',
  '/us/my-voter-registration-drive',
  '/us/quiz-results/*',
];

/**
 * Paths to check for when we want to display the newsletter popover
 */
export const newsLetterWidgetPaths = [
  '/us/about/easy-scholarships',
  'us/facts/*',
];

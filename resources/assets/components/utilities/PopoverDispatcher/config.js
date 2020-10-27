/**
 *
 * Because the SitewideBanner CTA is hardcoded to redirect to vote.dosomething.org, we want to hide
 * the banner on certain pages based on content, or when authenticated user is already registered or
 * ineligible to vote.
 */
// An asterik can be used to exclude all children of a path, e.g. /us/campaigns/ready-vote/*
export const sitewideBannerExcludedPaths = [
  '/us/campaigns/ready-vote',
  '/us/campaigns/ready-vote/*',
  '/us/my-voter-registration-drive',
  '/us/quiz-results/*',
];

/**
 * Paths to check for when we want to display the newsletter popover
 */
export const scholarshipsNewsletterPaths = [
  '/us/about/easy-scholarships',
  '/us/articles/6-free-places-to-find-no-essay-scholarships',
  '/us/articles/10-places-to-find-scholarships-for-high-school-seniors',
  '/us/articles/how-to-apply-for-scholarships-like-a-pro',
  '/us/articles/scholarship-winners',
];

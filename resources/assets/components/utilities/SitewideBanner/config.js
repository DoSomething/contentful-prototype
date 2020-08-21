/**
 * This may eventually turn into config variables to avoid hardcoding when to suppress.
 */
export const excludedPaths = [
  '/us/campaigns/ready-vote',
  '/us/campaigns/ready-vote/*',
  '/us/my-voter-registration-drive',
  '/us/quiz-results/*',
];

// Hide banner if user is registered to vote, or ineligible to vote.
export const excludedVoterRegistrationStatuses = [
  'CONFIRMED',
  'INELIGIBLE',
  'REGISTRATION_COMPLETE',
];

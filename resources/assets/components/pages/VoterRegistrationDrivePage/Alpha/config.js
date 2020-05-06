import { isDevEnvironment } from '../../../../helpers';

// Note: We're not using FAQ block yet, exists as a separate campaign page.
// @see https://dosomething.slack.com/archives/CTVPG6L4R/p1588785224363300?thread_ts=1588722526.354200&cid=CTVPG6L4R
export const faq = {
  // ContentBlock used for FAQ section.
  contentBlockId: isDevEnvironment()
    ? '6H22Y1wmICy05pM9twIGGR'
    : '1nLV3YUhLzJdlcGrd2Mq9N',
};

export const shareLink = {
  // Used to count total number of scholarship entries.
  actionId: isDevEnvironment() ? 27 : 1025,
  // ContentBlock that appears above the SocialDriveAction.
  contentBlockId: isDevEnvironment()
    ? '1xcG1CTinKwn3Iyxtcc0f4'
    : '3fj7mXlyrcJZ3mUKXqco1R',
};

// Options to use for customizing the SocialDriveAction share link (not implemented yet).
export const votingReasons = {
  'climate-change': 'Climate Change',
  'gun-violence': 'Gun Violence',
  'mental-health': 'Mental Health',
  'student-debt': 'Student Debt',
  'covid-relief': 'COVID-19 Relief',
  'immigration-reform': 'Immigration Reform',
  healthcare: 'Healthcare',
};

import { isDevEnvironment } from '../../../../helpers';

export const faq = {
  // ContentBlock used for FAQ section.
  contentBlockId: isDevEnvironment()
    ? '3cXc0RPMVNeE4surEqFujL'
    : '4yP8BdIdiGU0qwZaFyzmsm',
};

export const registerToVote = {
  // ContentBlock used for step to start voter registration.
  contentBlockId: isDevEnvironment()
    ? 'bt0jUBYJaKoi1oab25Wmx'
    : '2d2i2M3yn4RB9pZYVzQxGm',
};

export const voterRegistrationDriveCampaignLink = {
  // ContentBlock used for step to join the voter registration drive campaign (become an alpha).
  contentBlockId: isDevEnvironment()
    ? '3p2qz2JPCvgVitgRVBoMFz'
    : '30rCn63G1rnpzojCXC9PmF',
};

// Map of query string parameters and the voting reasons to display in the hero section quote.
export const votingReasons = {
  'climate-change': 'climate change',
  'gun-violence': 'gun violence',
  'mental-health': 'mental health',
  'student-debt': 'student debt',
  'covid-relief': 'COVID-19 relief',
  'immigration-reform': 'immigration reform',
  healthcare: 'healthcare',
};

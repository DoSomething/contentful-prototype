// Values for GraphQL queries.
export const gqlVariables = {
  production: {
    faq: {
      contentBlockId: '4yP8BdIdiGU0qwZaFyzmsm',
    },
    startVoterRegistration: {
      contentBlockId: '2d2i2M3yn4RB9pZYVzQxGm',
    },
    joinCampaign: {
      contentBlockId: '30rCn63G1rnpzojCXC9PmF',
    },
  },
  development: {
    faq: {
      contentBlockId: '3cXc0RPMVNeE4surEqFujL',
    },
    startVoterRegistration: {
      contentBlockId: 'bt0jUBYJaKoi1oab25Wmx',
    },
    joinCampaign: {
      contentBlockId: '3p2qz2JPCvgVitgRVBoMFz',
    },
  },
};

/**
 * Map of the 'voting-reasons` query values, and the corresponding voting reason to display.
 * e.g. /my-voter-registration-page?voting-reasons=gun-violence,immigration-reform&referrer_user_id=583d...
 */
export const votingReasons = {
  'racial-justice': 'racial justice',
  'climate-change': 'climate change',
  'gun-violence': 'gun violence',
  'mental-health': 'mental health',
  'student-debt': 'student debt',
  'covid-relief': 'COVID-19 relief',
  'immigration-reform': 'immigration reform',
  healthcare: 'healthcare',
  'lgbtq-rights': 'lgbtq+ rights',
  'homelessness-and-poverty': 'homelessness and poverty',
  education: 'education reform',
  'gender-equality': 'gender equality',
};

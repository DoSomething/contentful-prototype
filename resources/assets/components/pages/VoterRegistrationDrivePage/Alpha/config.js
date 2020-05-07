// Values for GraphQL queries.
export const gqlVariables = {
  production: {
    faq: {
      contentBlockId: '1nLV3YUhLzJdlcGrd2Mq9N',
    },
    shareLink: {
      actionId: 1025,
      contentBlockId: '3fj7mXlyrcJZ3mUKXqco1R',
    },
  },
  dev: {
    faq: {
      contentBlockId: '6H22Y1wmICy05pM9twIGGR',
    },
    shareLink: {
      actionId: 27,
      contentBlockId: '1xcG1CTinKwn3Iyxtcc0f4',
    },
  },
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

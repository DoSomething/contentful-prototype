/**
 This is a mock campaign action page with a blocks field consisting of a single CurrentSchoolBlock,
 which does not have an Action ID set.
 */
export default {
  campaign: {
    id: '3UHncRehVXiJNkHYyuXXcy',
    campaignId: '9001',
    type: 'campaign',
    template: 'mosaic',
    title: 'Example School Finder Campaign',
    slug: 'test-school-finder-campaign',
    metadata: null,
    status: null,
    endDate: null,
    callToAction:
      'This is an example School Finder campaign for automated testing.',
    tagline: 'This is an example School Finder campaign for automated testing.',
    blurb:
      '**This campaign is used for our Cypress automated testing suite.** Please only make edits if you need them for a browser test. If you do make a change, update the corresponding snapshot in the `cypress/fixtures` directory.',
    coverImage: {
      description: '',
      url: null,
      landscapeUrl: null,
    },
    campaignLead: {
      id: 'ToTiTKX3GXArRv2bLkzT43',
      type: 'person',
      fields: {
        name: 'Us',
        type: 'staff',
        active: true,
        jobTitle: null,
        email: 'help@dosomething.org',
        photo: null,
        alternatePhoto: null,
        description: null,
      },
    },
    affiliateSponsors: [],
    affiliatePartners: [],
    quizzes: [],
    dashboard: null,
    affirmation: null,
    pages: [
      {
        id: '3OJVMarnFkDT8NechQ4Bap',
        type: 'page',
        fields: {
          internalTitle: 'Test School Finder Campaign Action Page',
          title: 'Test School Finder Campaign Action Page',
          subTitle: 'Yeah, science!',
          slug: 'test-school-finder-campaign/action',
          metadata: null,
          authors: [],
          coverImage: {
            description: '',
            url: null,
          },
          content: null,
          blocks: [
            {
              id: '6Kj1Av7MnvNcCXLYHLGee0',
              type: 'currentSchoolBlock',
              fields: {
                internalTitle: 'Generic Current School Block',
                selectSchoolDescription:
                  'Pick your school and whatever. Invite your classmates to join this campaign and donate their jeans to win prizes and some other stuff.',
                schoolNotAvailableDescription:
                  'No school copy goes here, please email Sahara with information about your school.',
              },
            },
          ],
          displaySocialShare: null,
          hideFromNavigation: null,
          socialOverride: null,
        },
      },
    ],
    landingPage: null,
    socialOverride: null,
    additionalContent: null,
    allowExperiments: null,
    actionText: 'Join Us',
    staffPick: null,
    cause: null,
    scholarshipAmount: null,
    scholarshipDeadline: null,
    affiliateOptInContent: null,
  },
};

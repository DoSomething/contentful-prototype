// Mock Action Details:
const ACTION_ONE = {
  id: 1,
  actionLabel: 'Contact a Decision-Maker',
  timeCommitmentLabel: '3+ hours',
  noun: 'things',
  verb: 'done',
};

const ACTION_TWO = {
  id: 2,
  actionLabel: 'Attend an Event',
  timeCommitmentLabel: '4+ hours',
  noun: 'things',
  verb: 'done',
};

const ACTION_THREE = {
  id: 3,
  actionLabel: 'Collect Something',
  timeCommitmentLabel: '30 minutes - 1 hour',
  noun: 'things',
  verb: 'done',
};

const ACTION_FOUR = {
  id: 4,
  actionLabel: 'Sit Around',
  timeCommitmentLabel: '0 time',
  noun: 'nothing',
  verb: 'done',
};

const AFFILIATE_SPONSORS = [
  {
    logo: {
      url: 'https://images/sponsor-logo',
    },
  },
];

// Mock Campaign Website Showcase:
const CAMPAIGN_ONE = {
  path: '/us/campaigns/escape-the-vape',
  showcaseImage: {
    url: 'https://images.api.info/1',
    description: 'Cover Photo 1',
  },
  showcaseTitle: 'Example Campaign 1',
  showcaseDescription: 'Example Description 1',
  affiliateSponsors: AFFILIATE_SPONSORS,
};

const CAMPAIGN_TWO = {
  path: '/us/campaigns/escape-the-crepe',
  showcaseImage: {
    url: 'https://images.api.info/2',
    description: 'Cover Photo 2',
  },
  showcaseTitle: 'Example Campaign 2',
  showcaseDescription: 'Example Description 2',
  affiliateSponsors: AFFILIATE_SPONSORS,
};

const CAMPAIGN_THREE = {
  path: '/us/campaigns/escape-the-severus-snape',
  showcaseImage: {
    url: 'https://images.api.info/3',
    description: 'Cover Photo 3',
  },
  showcaseTitle: 'Example Campaign 3',
  showcaseDescription: 'Example Description 3',
  affiliateSponsors: AFFILIATE_SPONSORS,
};

// Mock reponse paginatedPost data from GraphQL:
export const mockPostsResponse = [
  {
    node: {
      id: 1,
      createdAt: '2020-04-01T18:38:03Z',
      quantity: null,
      hoursSpent: null,
      status: 'PENDING',
      url: 'images/1',
      actionDetails: ACTION_ONE,
      campaign: {
        campaignWebsite: CAMPAIGN_ONE,
      },
    },
  },
  {
    node: {
      id: 2,
      createdAt: '2020-04-01T17:53:40Z',
      quantity: 1,
      hoursSpent: 1.25,
      status: 'PENDING',
      url: 'images/2',
      actionDetails: ACTION_TWO,
      campaign: {
        campaignWebsite: CAMPAIGN_TWO,
      },
    },
  },
  {
    node: {
      id: 3,
      createdAt: '2020-01-06T20:45:21Z',
      quantity: 1,
      hoursSpent: 3.5,
      status: 'PENDING',
      url: 'images/3',
      actionDetails: ACTION_TWO,
      campaign: {
        campaignWebsite: CAMPAIGN_TWO,
      },
    },
  },
  {
    node: {
      id: 4,
      createdAt: '2019-12-10T21:42:24Z',
      quantity: 90,
      hoursSpent: 0.7,
      status: 'PENDING',
      url: 'images/4',
      actionDetails: ACTION_TWO,
      campaign: {
        campaignWebsite: CAMPAIGN_TWO,
      },
    },
  },
  {
    node: {
      id: 5,
      createdAt: '2019-11-21T20:00:13Z',
      quantity: 1,
      hoursSpent: 5.0,
      status: 'ACCEPTED',
      url: 'images/5',
      actionDetails: ACTION_THREE,
      campaign: {
        campaignWebsite: CAMPAIGN_THREE,
      },
    },
  },
  {
    node: {
      id: 6,
      createdAt: '2019-11-21T20:00:12Z',
      quantity: 1,
      hoursSpent: 0.33,
      status: 'ACCEPTED',
      url: 'images/6',
      actionDetails: ACTION_THREE,
      campaign: {
        campaignWebsite: CAMPAIGN_THREE,
      },
    },
  },
  {
    node: {
      id: 7,
      createdAt: '2019-11-22',
      quantity: 1,
      hoursSpent: 1,
      status: 'ACCEPTED',
      url: 'images/7',
      actionDetails: ACTION_FOUR,
      campaign: {
        campaignWebsite: null,
      },
    },
  },
];

export const mockUserResponse = {
  id: '123',
  firstName: 'Brent',
  lastName: 'Sakkoy',
  email: 'brent.sakkoy@yahoo.gov',
};

// Mocked paginatedPost data should be parsed into the following result:
export const mockParsedPostsData = [
  {
    actionId: 1,
    campaignWebsite: CAMPAIGN_ONE,
    actionLabel: ACTION_ONE.actionLabel,
    dateCompleted: 'April 1st, 2020',
    volunteerHours: ACTION_ONE.timeCommitmentLabel,
    pending: true,
    photo: undefined,
    impactLabel: null,
    hoursSpentLabel: null,
    user: mockUserResponse,
  },
  {
    actionId: 2,
    campaignWebsite: CAMPAIGN_TWO,
    actionLabel: ACTION_TWO.actionLabel,
    dateCompleted: 'December 10th, 2019',
    volunteerHours: ACTION_TWO.timeCommitmentLabel,
    pending: true,
    photo: undefined,
    impactLabel: null,
    hoursSpentLabel: null,
    user: mockUserResponse,
  },
  {
    actionId: 3,
    campaignWebsite: CAMPAIGN_THREE,
    actionLabel: ACTION_THREE.actionLabel,
    dateCompleted: 'November 21st, 2019',
    volunteerHours: ACTION_THREE.timeCommitmentLabel,
    pending: false,
    impactLabel: '2 things done',
    hoursSpentLabel: '5 hours 20 minutes',
    photo: 'images/6',
    user: mockUserResponse,
  },
];

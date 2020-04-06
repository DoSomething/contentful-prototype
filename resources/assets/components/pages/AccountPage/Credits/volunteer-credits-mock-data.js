// Mock Action Details:
const ACTION_ONE = {
  id: 1,
  actionLabel: 'Contact a Decision-Maker',
  timeCommitmentLabel: '3+ hours',
};

const ACTION_TWO = {
  id: 2,
  actionLabel: 'Attend an Event',
  timeCommitmentLabel: '4+ hours',
};

const ACTION_THREE = {
  id: 3,
  actionLabel: 'Collect Something',
  timeCommitmentLabel: '30 minutes - 1 hour',
};

// Mock Campaign Website Showcase:
const CAMPAIGN_ONE = {
  showcaseImage: {
    url: 'https://images.api.info/1',
    description: 'Cover Photo 1',
  },
  showcaseTitle: 'Example Campaign 1',
  showcaseDescription: 'Example Description 1',
};

const CAMPAIGN_TWO = {
  showcaseImage: {
    url: 'https://images.api.info/2',
    description: 'Cover Photo 2',
  },
  showcaseTitle: 'Example Campaign 2',
  showcaseDescription: 'Example Description 2',
};

const CAMPAIGN_THREE = {
  showcaseImage: {
    url: 'https://images.api.info/3',
    description: 'Cover Photo 3',
  },
  showcaseTitle: 'Example Campaign 3',
  showcaseDescription: 'Example Description 3',
};

// Mock reponse paginatedPost data from GraphQL:
export const mockPostsResponse = [
  {
    node: {
      id: 1,
      createdAt: '2020-04-01T18:38:03Z',
      quantity: null,
      status: 'PENDING',
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
      status: 'PENDING',
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
      status: 'PENDING',
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
      status: 'PENDING',
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
      status: 'ACCEPTED',
      actionDetails: ACTION_THREE,
      campaign: {
        campaignWebsite: CAMPAIGN_THREE,
      },
    },
  },
];

// Mocked paginatedPost data should be parsed into the following result:
export const mockParsedPostsData = [
  {
    id: 1,
    campaignWebsite: CAMPAIGN_ONE,
    actionLabel: ACTION_ONE.actionLabel,
    dateCompleted: 'April 1st, 2020',
    volunteerHours: ACTION_ONE.timeCommitmentLabel,
    pending: true,
  },
  {
    id: 4,
    campaignWebsite: CAMPAIGN_TWO,
    actionLabel: ACTION_TWO.actionLabel,
    dateCompleted: 'December 10th, 2019',
    volunteerHours: ACTION_TWO.timeCommitmentLabel,
    pending: true,
  },
  {
    id: 5,
    campaignWebsite: CAMPAIGN_THREE,
    actionLabel: ACTION_THREE.actionLabel,
    dateCompleted: 'November 21st, 2019',
    volunteerHours: ACTION_THREE.timeCommitmentLabel,
    pending: false,
  },
];

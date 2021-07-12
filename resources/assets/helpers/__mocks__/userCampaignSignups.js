const signups = {
  edges: [
    // Scholarship action & scholarship post.
    {
      node: {
        id: 3682,
        createdAt: '2020-10-28T16:51:24.000Z',
        campaign: {
          id: 9000,
          endDate: '2020-02-29T05:00:00.000Z',
          campaignWebsite: {
            showcaseTitle: 'Give a Spit About Cancer ',
            showcaseDescription:
              'Fight blood cancer just by swabbing your cheek.',
            showcaseImage: {
              url:
                'https://images.ctfassets.net/81iqaqpfd8fy/2dbyLUKxyUiuOe06i2W4uE/7ebdb15c6aa34e6c94f415ec01f6d482/GAS_2018_Header_1_Landscape.jpg?f=center',
            },
            id: '5kfd9rnZuwKsA6qIwKOaKm',
            staffPick: null,
            path: '/us/campaigns/give-spit-about-cancer',
          },
          actions: [
            {
              id: 1,
              scholarshipEntry: true,
              reportback: true,
            },
          ],
        },
        posts: [
          {
            id: 4068,
            status: 'PENDING',
            createdAt: '2021-03-22T20:23:45.000Z',
            actionDetails: {
              id: 1,
              scholarshipEntry: true,
              reportback: true,
            },
          },
        ],
      },
    },
    // Non-expired, scholarship action, & no post.
    {
      node: {
        id: 1530,
        createdAt: '2020-06-03T16:49:49.000Z',
        campaign: {
          id: 9035,
          endDate: null,
          campaignWebsite: {
            showcaseTitle: 'Give a Spit About Cancer ',
            showcaseDescription:
              'Fight blood cancer just by swabbing your cheek.',
            showcaseImage: {
              url:
                'https://images.ctfassets.net/81iqaqpfd8fy/2dbyLUKxyUiuOe06i2W4uE/7ebdb15c6aa34e6c94f415ec01f6d482/GAS_2018_Header_1_Landscape.jpg?f=center',
            },
            id: '5kfd9rnZuwKsA6qIwKOaKm',
            staffPick: null,
            path: '/us/campaigns/give-spit-about-cancer',
          },
          actions: [
            {
              id: 26,
              scholarshipEntry: true,
              reportback: true,
            },
          ],
        },
        posts: [],
      },
    },
    // Non-scholarship action & post.
    {
      node: {
        id: 1488,
        createdAt: '2020-01-15T15:59:01.000Z',
        campaign: {
          id: 9002,
          endDate: '2020-03-06T05:00:00.000Z',
          campaignWebsite: {
            showcaseTitle: 'Example Campaign',
            showcaseDescription:
              'This is an example campaign for automated testing.',
            showcaseImage: {
              url:
                'https://images.ctfassets.net/81iqaqpfd8fy/GR8DbT1SjipEOZ1ey0qQd/da707c867e8bdb1522facdaac0a8a768/69146-istock-910939920.webp?f=center',
            },
            id: '4MtEG1BNi3d2AQPkoql8i4',
            staffPick: true,
            path: '/us/campaigns/test-example-campaign',
          },
          actions: [
            {
              id: 5,
              scholarshipEntry: true,
              reportback: false,
            },
          ],
        },
        posts: [
          {
            id: 4086,
            status: 'PENDING',
            createdAt: '2021-04-14T14:50:32.000Z',
            actionDetails: {
              id: 6,
              scholarshipEntry: false,
              reportback: true,
            },
          },
        ],
      },
    },
    // Expired campaign
    {
      node: {
        id: 1476,
        createdAt: '2019-12-09T16:10:50.000Z',
        campaign: {
          id: 9031,
          endDate: '2019-12-24T05:00:00.000Z',
          campaignWebsite: {
            showcaseTitle: 'I Found My V-Spot',
            showcaseDescription:
              'Find your polling place and send us photos of you voting.',
            showcaseImage: {
              url:
                'https://images.ctfassets.net/81iqaqpfd8fy/5kVfaHYgmcmy84ywKikc8q/f7dbc5e5ef10bce45f193b229576205e/Question7-ChoiceA.jpg?f=center',
            },
            id: '1ydEYaM1ZGEEaGmeauQiUg',
            staffPick: true,
            path: '/us/campaigns/i-found-my-v-spot-2018',
          },
          actions: [],
        },
        posts: [],
      },
    },
    // Non-reportback post.
    {
      node: {
        id: 1474,
        createdAt: '2019-12-06T17:15:17.000Z',
        campaign: {
          id: 9032,
          endDate: null,
          campaignWebsite: {
            showcaseTitle: 'Give a Spit About Cancer ',
            showcaseDescription:
              'Fight blood cancer just by swabbing your cheek.',
            showcaseImage: {
              url:
                'https://images.ctfassets.net/81iqaqpfd8fy/2dbyLUKxyUiuOe06i2W4uE/7ebdb15c6aa34e6c94f415ec01f6d482/GAS_2018_Header_1_Landscape.jpg?f=center',
            },
            id: '5kfd9rnZuwKsA6qIwKOaKm',
            staffPick: null,
            path: '/us/campaigns/give-spit-about-cancer',
          },
          actions: [
            {
              id: 24,
              scholarshipEntry: false,
              reportback: true,
            },
            {
              id: 25,
              scholarshipEntry: false,
              reportback: false,
            },
          ],
        },
        posts: [
          {
            id: 3946,
            status: 'ACCEPTED',
            createdAt: '2020-10-28T16:53:01.000Z',
            actionDetails: {
              id: 25,
              scholarshipEntry: false,
              reportback: false,
            },
          },
        ],
      },
    },
  ],
};

export default signups;

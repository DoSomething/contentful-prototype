//
// This is a "snapshot" of an example campaign we've created on Contentful
// for automated testing. To update the snapshot, change the campaign & copy
// the output from `window.STATE` at the following URL into this file:
//
// https://dev.dosomething.org/us/campaigns/test-example-campaign/action
//
import { campaignId } from '../constants';

export default {
  campaign: {
    id: '4MtEG1BNi3d2AQPkoql8i4',
    campaignId,
    type: 'campaign',
    template: 'mosaic',
    title: 'Example Campaign',
    slug: 'test-example-campaign',
    metadata: null,
    status: null,
    endDate: null,
    callToAction: 'This is an example campaign for automated testing.',
    tagline: 'This is an example campaign for automated testing.',
    blurb:
      "**This campaign is used for our Cypress automated testing suite.** Please only make edits if you need them for a browser test. If you do make a change, update the corresponding snapshot in the `cypress/fixtures` directory.\n\n - This is a bullet point, because that's a thing we do.\n - Did you know that the world's oldest cat [drank coffee](https://en.wikipedia.org/wiki/Creme_Puff_(cat)) every day?",
    coverImage: {
      description: 'This is a cover photo for our Cypress example campaign.',
      url:
        'https://images.ctfassets.net/81iqaqpfd8fy/GR8DbT1SjipEOZ1ey0qQd/da707c867e8bdb1522facdaac0a8a768/69146-istock-910939920.webp',
      landscapeUrl:
        'https://images.ctfassets.net/81iqaqpfd8fy/GR8DbT1SjipEOZ1ey0qQd/da707c867e8bdb1522facdaac0a8a768/69146-istock-910939920.webp?w=2880&h=1240&fm=jpg&fit=fill',
    },
    campaignLead: {
      id: '2cRhrKW4d2icWsIcaaKykI',
      type: 'person',
      fields: {
        name: 'Dave Furnes',
        type: 'staff',
        active: true,
        jobTitle: 'Staff Engineer',
        email: 'dfurnes@dosomething.org',
        photo: {
          url: null,
          description: null,
        },
        alternatePhoto: {
          url:
            'https://images.ctfassets.net/81iqaqpfd8fy/3p0etbv0zYwYEso4AQysuS/4c571d69357c1fbc78bbd09d3e137c94/Dave_Furnes_Kid_Picture.png',
          description: null,
        },
        description: null,
        twitterId: 'dfurnes',
      },
    },
    affiliateSponsors: [
      {
        id: '4pXezJiSmAyCE6EqO8uQmO',
        type: 'affiliates',
        fields: {
          link: 'https://www.3m.com/3M/en_US/gives-us/',
          title: '3M ',
          logo: {
            url:
              'https://images.ctfassets.net/81iqaqpfd8fy/5CxggVKb4WWgcwEOqyCwOG/b3d575312f9ccb05eb4c8b56459ed3a4/3M_logo__1_.png?h=100&fm=png&fit=scale',
            title: '3M logo',
            description: '3M logo',
          },
        },
      },
    ],
    affiliatePartners: [],
    quizzes: [],
    dashboard: null,
    affirmation: null,
    pages: [
      {
        id: '3fuXSQZY4r9kcBi7lAoDlI',
        type: 'page',
        fields: {
          internalTitle: '[Test] Example Campaign Action Page',
          title: 'Action',
          subTitle: null,
          slug: 'test-example-campaign/action',
          metadata: null,
          authors: [],
          coverImage: {
            description: '',
            url: null,
          },
          content: null,
          sidebar: [],
          blocks: [
            {
              id: '1G5PUgAZAh4WvvPDqlEy4u',
              type: 'contentBlock',
              fields: {
                superTitle: 'Step 1',
                title: 'Know It',
                subTitle: null,
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis eleifend diam, sit amet imperdiet mi porttitor luctus. Etiam luctus sem nec nunc aliquam, et interdum arcu pellentesque. Duis dictum nibh vel nibh dignissim condimentum. Phasellus vel varius ante. Vivamus finibus quam quis justo venenatis, eu porta dolor porta.',
                image: {
                  url: null,
                  description: null,
                },
                imageAlignment: null,
                additionalContent: null,
              },
            },
            {
              id: '3Au9UnzEBGMHjwlBSujlv5',
              type: 'textSubmissionAction',
              fields: {
                actionId: 5,
                title: 'Tell Us Things',
                textFieldLabel: null,
                textFieldPlaceholder: null,
                buttonText: null,
                informationTitle: null,
                informationContent:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare eget magna at imperdiet. Ut tempor elit ac dolor convallis sollicitudin. Phasellus a scelerisque lacus. Nullam sit amet sem ut ex feugiat hendrerit.',
                affirmationContent:
                  'Ut ac urna et elit tristique feugiat. Pellentesque congue ac leo eu tristique. Nunc felis neque, ultrices eu leo a, tincidunt ultricies leo. Vivamus semper mi quis ipsum volutpat vestibulum. Suspendisse potenti. Fusce lectus metus, facilisis eget viverra sed, accumsan at tortor. Integer placerat est massa, quis pharetra dolor interdum suscipit.',
                additionalContent: null,
              },
            },
            {
              id: '6orwgSeryEmhc5G40QShBh',
              type: 'contentBlock',
              fields: {
                superTitle: 'Step 2',
                title: 'Prove It',
                subTitle: 'Just small change to know what this does',
                content:
                  'Vestibulum rhoncus tellus vitae sem tempor volutpat. Duis quam metus, dictum id mollis et, imperdiet a sapien. Pellentesque tincidunt vehicula ex vel sodales. Morbi elementum sem mauris, at euismod urna elementum vulputate. Nulla bibendum augue sit amet est lacinia feugiat in imperdiet lectus.\n',
                image: {
                  url: null,
                  description: null,
                },
                imageAlignment: null,
                additionalContent: null,
              },
            },
            {
              id: '6fKwdXz8gYyqJiy42R5c3h',
              type: 'photoSubmissionAction',
              fields: {
                actionId: 6,
                title: null,
                captionFieldLabel: null,
                captionFieldPlaceholder: null,
                showQuantityField: true,
                quantityFieldLabel: null,
                quantityFieldPlaceholder: null,
                numberOfParticipantsFieldLabel: null,
                whyParticipatedFieldLabel: null,
                whyParticipatedFieldPlaceholder: null,
                buttonText: null,
                informationTitle: null,
                informationContent: null,
                affirmationContent:
                  'Aenean nec quam condimentum, scelerisque tellus in, ullamcorper velit. Suspendisse pretium odio libero, at sagittis elit blandit id. Fusce sagittis sagittis tortor, vitae rhoncus mauris. Pellentesque euismod urna vitae mi lobortis, pretium semper sem rhoncus. Cras vel felis ac augue commodo auctor a ac nulla. Sed commodo, felis non interdum aliquam, odio orci viverra mi, at viverra lectus est et felis.',
                additionalContent: null,
              },
            },
            {
              id: '4Q9dPplHCm5Q69F9AEmfu6',
              type: 'postGallery',
              fields: {
                internalTitle: '[Test] Example Campaign Gallery',
                actionIds: [5, 6],
                itemsPerRow: 3,
                filterType: null,
                hideReactions: false,
              },
            },
          ],
          displaySocialShare: null,
          hideFromNavigation: null,
          socialOverride: null,
        },
      },
      {
        id: '2Ju2Efyg6WPlrDfGATSyEw',
        type: 'page',
        fields: {
          internalTitle: "[Test] Example Campaign FAQ's Page",
          title: "FAQ's",
          subTitle: null,
          slug: 'test-example-campaign/faqs',
          metadata: null,
          authors: [],
          coverImage: {
            description: '',
            url: null,
          },
          content:
            '# Here are some commonly asked questions:\n\n## Why?\nBecause.',
          sidebar: [],
          blocks: [],
          displaySocialShare: null,
          hideFromNavigation: null,
          socialOverride: null,
        },
      },
    ],
    landingPage: {
      id: '1Y1b56hDTnpx1HOj6qebt',
      type: 'landingPage',
      fields: {
        internalTitle: '[Test] Example Campaign Landing Page',
        title: 'Example Campaign Landing Page',
        subTitle: null,
        content:
          '## The Problem\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit elementum erat in cursus. Donec aliquam tellus at erat gravida, sit amet vehicula velit vehicula. Nam sollicitudin posuere augue et ultricies. Nam dapibus lorem non dui ullamcorper, ac volutpat nunc interdum.\n\n## The Solution\nSed mi est, venenatis at turpis id, scelerisque blandit elit. Phasellus volutpat accumsan arcu, nec porttitor odio sollicitudin non. Maecenas dictum dignissim diam, a rutrum metus tincidunt et. Curabitur felis purus, auctor quis efficitur nec, cursus eget nunc. Integer quis tellus non justo vulputate eleifend ut sit amet leo.',
        sidebar: [],
        blocks: [],
        additionalContent: null,
      },
    },
    socialOverride: null,
    additionalContent: null,
    allowExperiments: null,
    actionText: 'Join Us',
    staffPick: true,
    cause: 'animals',
    scholarshipAmount: 5000,
    scholarshipCallToAction: null,
    scholarshipDeadline: '2020-06-24T00:00:00Z',
    scholarshipDescription: null,
    affiliateOptInContent: null,
  },
};

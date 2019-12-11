//
// This is a "snapshot" of an example campaign we've created on Contentful
// for automated testing. To update the snapshot, change the campaign & copy
// the output from `window.STATE` at the following URL into this file:
//
// https://dev.dosomething.org/us/campaigns/test-example-campaign/action
//
import { campaignId } from './constants';

export const exampleCampaign = {
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
        photo: null,
        alternatePhoto:
          'https://images.ctfassets.net/81iqaqpfd8fy/3p0etbv0zYwYEso4AQysuS/4c571d69357c1fbc78bbd09d3e137c94/Dave_Furnes_Kid_Picture.png',
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
          coverImage: { description: '', url: null },
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
                image: { url: null, description: null },
                imageAlignment: 'right',
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
                subTitle: null,
                content:
                  'Vestibulum rhoncus tellus vitae sem tempor volutpat. Duis quam metus, dictum id mollis et, imperdiet a sapien. Pellentesque tincidunt vehicula ex vel sodales. Morbi elementum sem mauris, at euismod urna elementum vulputate. Nulla bibendum augue sit amet est lacinia feugiat in imperdiet lectus.',
                image: { url: null, description: null },
                imageAlignment: 'right',
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
    scholarshipDeadline: '2020-06-24T00:00:00Z',
    affiliateOptInContent: null,
  },
};

export const exampleFactPage = {
  page: {
    id: '1Ek0Dt7Uur4aRfKW0vsby7',
    type: 'page',
    fields: {
      internalTitle: '[Test] 11 Facts About Testing',
      title: '11 Facts About Testing',
      subTitle: null,
      slug: 'facts/test-11-facts-about-testing',
      metadata: null,
      authors: [],
      coverImage: { description: '', url: null },
      content:
        'Welcome to [DoSomething.org](https://www.dosomething.org), a global movement of millions of young people making positive change, online and off! The 11 facts you want are below, and the sources for the facts are at the very bottom of the page. After you learn something, Do Something! Find out how to [take action here](https://www.dosomething.org/us/campaigns).\n &nbsp; \n &#32;&#32; \n &nbsp; \n &#32;&#32; \n1. Cypress is an open-source JavaScript test runner. Cypress takes snapshots as your tests run. Simply hover over commands in the Command Log to see exactly what happened at each step.^[Cypress.io. "Open Source JavaScript Test Runner." Web Accessed June, 27 2019.]\n2. Cypress automatically retries assertions, so you don\'t have to explicitly set timeouts or wait for a selector to be visible. A single command followed by multiple assertions retries each one of them \u2013 in order.^[Cypress.io. "Core Concepts: Retry-ability." Web Accessed June 27, 2019.]\n3. If you have a very simple model layer, but your UI is complex, then you should focus your time on higher level browser tests.^[David Heinemeier Hansson. "Test-induced design damage." Web Accessed March 3, 2015.]\n4. Up to 90% of animals used in U.S. labs are not counted in the official statistics of animals tested. Take a stand by kidnapping your friends\u2019 products that were tested on animals (seriously!). Sign up for [Kidnapped Cosmetics](/us/campaigns/kidnapped-cosmetics?source=facts/11-facts-about-animal-testing).^[Humane Society International. "About Animal Testing." Web Accessed March 3, 2015.]\n5. Europe, the world\u2019s largest cosmetic market, Israel and India have already banned animal testing for cosmetics, and the sale or import of newly animal-tested beauty products.^[Humane Society International & The Humane Society of the United States. "Infographic: Ending Animal Testing For Cosmetics." Web Accessed March 2, 2015.]\n6. Even animals that are protected under the AWA can be abused and tortured. And the law doesn\u2019t require the use of valid alternatives to animals, even if they are available.^[Vanderau, Melanie L. "Science at any cost: The ineffectiveness and underenforcement of the Animal Welfare Act." Penn St. Envtl. L. Rev. 14 (2006): 721-721.]\n7. According to the Humane Society, registration of a single pesticide requires more than 50 experiments and the use of as many as 12,000 animals.^[Moxley, Angela. "The End of Animal Testing." The Humane Society of the United States, 2010. Web Accessed March 3, 2015.]\n8. In tests of potential carcinogens, subjects are given a substance every day for 2 years. Others tests involve killing pregnant animals and testing their fetuses.^[Moxley, Angela. "The End of Animal Testing." The Humane Society of the United States, 2010. Web Accessed March 3, 2015.]\n9. The real-life applications for some of the tested substances are as trivial as an \u201cimproved\u201d laundry detergent, new eye shadow, or copycat drugs to replace a profitable pharmaceutical whose patent expired.^[Moxley, Angela. "The End of Animal Testing." The Humane Society of the United States, 2010. Web Accessed March 3, 2015.]\n10. Alternative tests achieve one or more of the \u201c3 R\u2019s:\u201d replaces a procedure that uses animals with a procedure that doesn\u2019t, reduces the number of animals used in a procedure, refines a procedure to alleviate or minimize potential animal pain.^[Ibrahim, Darian M. "Reduce, refine, replace: The failure of the three R\'s and the future of animal experimentation." U. Chi. Legal F, 2006. Web Accessed March 20, 2015.]\n11. Several cosmetic tests commonly performed on mice, rats, rabbits, and guinea pigs include: skin and eye irritation tests where chemicals are rubbed on shaved skin or dripped into the eyes without any pain relief.^[Humane Society of the United States. "Fact Sheet: Animal Testing." Web accessed November 2, 2015.]',
      sidebar: [],
      blocks: [],
      displaySocialShare: null,
      hideFromNavigation: null,
      socialOverride: null,
    },
  },
};

//
// This is another "snapshot" of an example campaign we've created on Contentful
// for automated testing, with a school finder. To update the snapshot, change the campaign & copy
// the output from `window.STATE` at the following URL into this file:
//
// https://dev.dosomething.org/us/campaigns/test-school-finder-campaign/action
//
export const exampleSchoolFinderCampaign = {
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
          sidebar: [],
          blocks: [
            {
              id: '6Kj1Av7MnvNcCXLYHLGee0',
              type: 'contentBlock',
              fields: {
                superTitle: 'Step 1',
                title: 'Find Your School',
                subTitle:
                  'Win great prizes for your school and climb the leaderboard',
                content:
                  'Donec mollis neque eros, vitae venenatis turpis ultricies non. Sed ut tincidunt nulla, et sagittis mauris. Mauris tempor mauris sit amet nisi semper, quis pellentesque nunc congue. Nullam pharetra lacinia leo eu viverra. Nulla pellentesque augue nisi, nec tristique libero efficitur at. Join a school or no prizes, sucker.',
                image: {
                  url: null,
                  description: null,
                },
                imageAlignment: null,
                additionalContent: {
                  actionId: 21,
                  showSchoolFinder: true,
                  schoolNotAvailableHeadline: 'No School Selected',
                  schoolFinderFormDescription:
                    'Pick your school and whatever. Invite your classmates to join this campaign and donate their jeans to win prizes and some other stuff.',
                  schoolNotAvailableDescription:
                    'No school copy goes here, please email Sahara with information about your school.',
                },
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

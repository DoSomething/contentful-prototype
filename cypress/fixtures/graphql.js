import faker from 'faker';
import { ObjectID } from 'bson';
import { addMonths } from 'date-fns';

/**
 * Return a list of N items for a field, with an optional
 * list of field overrides for the items in the list.
 *
 * @param {Number} count
 * @param {Object} overrides
 */
export const MockList = (count, overrides = {}) =>
  new Array(count).fill().map(() => overrides);

/**
 * Default "operation" resolvers. These can be replaced or extended by
 * calling `cy.mockGraphQLOps({ operations: ... })` in a test.
 *
 * @var {Object}
 */
export const operations = {
  // By default, return empty submission galleries:
  SubmissionGalleryQuery: {
    posts: [],
  },
  // By default, return the requested number of posts:
  ActionGalleryQuery: {
    posts: (root, { count }) => MockList(count),
  },
  EmbedQuery: {
    embed: {
      type: 'LINK',
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      providerName: faker.company.companyName(),
      thumbnailUrl: faker.image.imageUrl(),
      html: null,
    },
  },
  ReferralPageCampaignQuery: {
    campaignWebsiteByCampaignId: {
      id: faker.random.uuid(),
      url: faker.internet.url(),
    },
  },
};

/**
 * Customized "mock" resolvers for our schema. Any types or fields
 * not defined here will automatically resolve a value that makes
 * sense based on their defined type.
 *
 * @var {Object}
 */
export const mocks = {
  // Custom scalars:
  AbsoluteUrl: () => 'https://www.example.com/',
  DateTime: () => new Date().toISOString(),
  JSON: () => ({}),

  // Types:
  User: () => ({
    id: () => new ObjectID().toString(),
    firstName: () => faker.name.firstName(),
  }),
  Action: () => ({
    noun: 'things',
    verb: 'done',
    anonymous: false,
    actionLabel: 'Sign a Petition',
    timeCommitmentLabel: '1 hour',
    scholarshipEntry: true,
    reportback: true,
  }),
  Post: () => ({
    status: 'ACCEPTED', // Most users will only see accepted posts!
    type: () => faker.random.arrayElement(['photo', 'text']),
    url: (post, { w = 400, h = 400 }) => faker.image.dataUri(w, h), // eslint-disable-line id-length
    text: () => faker.lorem.sentence(),
    quantity: () => Math.ceil(Math.random() * 99),
    reactions: () => Math.floor(Math.random() * 30),
    impact: () => `${Math.ceil(Math.random() * 99)} things done`,
  }),
  Campaign: () => ({
    endDate: () => addMonths(new Date(), 1).toISOString(),
    isOpen: true,
  }),
};

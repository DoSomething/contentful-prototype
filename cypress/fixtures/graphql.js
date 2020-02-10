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
 * Block ID mappings. These are used to "hook up" the expected blocks
 * reference by our PHP Content API mocks (e.g. 'exampleCampaign.js').
 *
 * @var {Object}
 */
const blocks = {
  '1G5PUgAZAh4WvvPDqlEy4u': 'ContentBlock',
  '3Au9UnzEBGMHjwlBSujlv5': 'TextSubmissionBlock',
  '6orwgSeryEmhc5G40QShBh': 'ContentBlock',
  '6fKwdXz8gYyqJiy42R5c3h': 'PhotoSubmissionBlock',
  '4Q9dPplHCm5Q69F9AEmfu6': 'PostGalleryBlock',
  '6Kj1Av7MnvNcCXLYHLGee0': 'CurrentSchoolBlock',
  '6lOSmXMObu8M8Ug6GSK6gs': 'GalleryBlock',
  '7qT9bG21eOhu9svaFL3rJ6': 'LinkAction',
  o9Le9daUHn0McdCdTRMMq: 'ContentBlock',
};

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

  // If the field is a string & not mocked, default to showing the
  // field name (instead of "Hello World") to make writing mocks easier:
  String: (root, args, context, info) => info.fieldName,

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
  // For blocks, we'll either use the provided '__typename' from the operation
  // mock, or we'll use our hardcoded IDs, above (for PHP interoperability).
  Block: (root, args) => ({
    id: args.id,
    __typename: args.__typename || blocks[args.id],
  }),
  // By default, we'll assume most optional block fields aren't set so
  // that they can just use the defaults in the component itself:
  TextSubmissionBlock: () => ({
    affirmationContent: null,
    buttonText: null,
    informationContent: null,
    informationTitle: null,
    textFieldLabel: null,
    textFieldPlaceholder: null,
    title: null,
  }),
  PhotoSubmissionBlock: () => ({
    affirmationContent: null,
    buttonText: null,
    captionFieldLabel: null,
    captionFieldPlaceholder: null,
    informationContent: null,
    informationTitle: null,
    numberOfParticipantsFieldLabel: null,
    quantityFieldLabel: null,
    quantityFieldPlaceholder: null,
    showQuantityField: true,
    title: null,
    whyParticipatedFieldLabel: null,
    whyParticipatedFieldPlaceholder: null,
  }),
  CurrentSchoolBlock: () => ({
    currentSchoolDescription: null,
    currentSchoolTitle: null,
    selectSchoolDescription:
      'Pick your school and whatever. Invite your classmates to join this campaign and donate their jeans to win prizes and some other stuff.',
    selectSchoolTitle: null,
    schoolNotAvailableDescription:
      'No school copy goes here, please email Sahara with information about your school.',
  }),
  CompanyPage: () => ({
    nodeType: 'document',
    content: {
      data: {},
      marks: [],
      value: 'Hello World',
      nodeType: 'text',
    },
    data: {},
  }),
};

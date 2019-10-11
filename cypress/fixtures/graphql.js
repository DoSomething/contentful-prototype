import faker from 'faker';
import { ObjectID } from 'bson';

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
  Date: () => {
    const date = new Date().toISOString();
    return date.substring(0, 10);
  },

  // Types:
  User: () => ({
    id: () => new ObjectID().toString(),
    firstName: () => faker.name.firstName(),
  }),
  Action: () => ({
    noun: 'things',
    verb: 'done',
    anonymous: false,
  }),
  Post: () => ({
    status: 'ACCEPTED', // Most users will only see accepted posts!
    type: () => faker.random.arrayElement(['photo', 'text']),
    url: (post, { w = 400, h = 400 }) => faker.image.dataUri(w, h), // eslint-disable-line id-length
    text: () => faker.lorem.sentence(),
    quantity: () => Math.ceil(Math.random() * 99),
    reactions: () => Math.floor(Math.random() * 30),
  }),
};

import faker from 'faker';
import { ObjectID } from 'bson';
import { MockList } from 'graphql-tools';

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
    type: () => faker.random.arrayElement(['photo', 'text']),
    url: (post, { w = 400, h = 400 }) => faker.image.dataUri(w, h),
    text: () => faker.lorem.sentence(),
    quantity: () => Math.ceil(Math.random() * 99),
    reactions: () => Math.floor(Math.random() * 30),
  }),
};

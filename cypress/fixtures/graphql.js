import faker from 'faker';
import { ObjectID } from 'bson';
import { MockList } from 'graphql-tools';

export default {
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

  // Query root:
  Query: () => ({
    // Return empty submission gallery, but standard campaign gallery...
    // TODO: Can we customize this per named query?
    posts: (root, { userId, count }) => new MockList(userId ? 0 : count),
  }),
};

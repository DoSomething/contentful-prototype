/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('Your Uploads', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Renders with zero posts', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [],
    });

    // Log in & visit the campaign action page:
    cy.login(user).visit('/us/account/campaigns');

    // We should see the empty state page
    cy.contains('Find a cause you care about and get started today!');
  });

  it('Renders with one post', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          text: 'Pepper dug a hole',
          impact: '40 things done',
          user: {
            firstName: 'Gertrude',
            __typename: 'User',
          },
        },
      ],
    });

    // Log in & visit the campaign action page:
    cy.login(user).visit('/us/account/campaigns');

    // We should see the post returned from GraphQL
    cy.contains('40 things done');
    cy.contains('Gertrude');
    cy.contains('Pepper dug a hole');
  });

  it('Renders with four posts', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          text: 'Pepper dug a hole',
          impact: '40 things done',
          user: {
            firstName: 'Molly',
            __typename: 'User',
          },
        },
        {
          text: 'Pepper ate some chicken',
          impact: '41 things done',
          user: {
            firstName: 'Chris',
            __typename: 'User',
          },
        },
        {
          text: 'Pepper curled up into a ball',
          impact: '42 things done',
          user: {
            firstName: 'Claire',
            __typename: 'User',
          },
        },
        {
          text: 'Pepper went for a run',
          impact: '43 things done',
          user: {
            firstName: 'Brad',
            __typename: 'User',
          },
        },
      ],
    });

    // Log in & visit the campaign action page:
    cy.login(user).visit('/us/account/campaigns');

    // We should see the 4 posts returned from GraphQL
    cy.contains('40 things done');
    cy.contains('Molly');
    cy.contains('Pepper dug a hole');
    cy.contains('41 things done');
    cy.contains('Chris');
    cy.contains('Pepper ate some chicken');
    cy.contains('42 things done');
    cy.contains('Claire');
    cy.contains('Pepper curled up into a ball');
    cy.contains('43 things done');
    cy.contains('Brad');
    cy.contains('Pepper went for a run');
  });
});

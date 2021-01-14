/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('User Account Campaigns Tab', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays default text if a user has not posted a reportback', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('empty-state-block').should('have.length', 1);
  });

  /** @test */
  it('Displays user name for a non anonymous post', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          actionDetails: {
            anonymous: false,
          },
          user: {
            firstName: user.firstName,
          },
        },
      ],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('post-author').should('have.length', 1);
  });

  /** @test */
  it('Displays user name for a non anonymous post', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          actionDetails: {
            anonymous: true,
          },
          user: {
            firstName: user.firstName,
          },
        },
      ],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('anonymous-post-author').should('have.length', 1);
  });

  /** @test */
  it('Displays the caption of a photo post under the photo', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          type: 'photo',
        },
      ],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('photo-post-caption').should('have.length', 1);
  });

  /** @test */
  it('Displays the caption of a text post at the top of the Postcard', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserPostsQuery', {
      postsByUserId: [
        {
          type: 'text',
        },
      ],
    });

    cy.login(user);
    cy.visit(`/us/account/campaigns`);
    cy.findByTestId('text-post-caption').should('have.length', 1);
  });
});

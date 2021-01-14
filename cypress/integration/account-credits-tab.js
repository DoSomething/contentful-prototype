/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

describe('User Account Volunteer Credits Tab', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Links to the correct learn more page', () => {
    const user = userFactory();

    cy.login(user);
    cy.visit(`/us/account/credits`);
    cy.findByTestId('about-volunteer-credits-link').should('have.length', 1);
    cy.findByTestId('about-volunteer-credits-link').should(
      'have.attr',
      'href',
      '/us/about/volunteer-hours',
    );
  });

  /** @test */
  it('Displays the Credits Table if a user has earned them', () => {
    const user = userFactory();

    cy.mockGraphqlOp('volunteerCreditPostsQuery', {
      paginatedPosts: {
        edges: {
          node: {
            status: 'ACCEPTED',
          },
        },
      },
    });

    cy.login(user);
    cy.visit(`/us/account/credits`);
    cy.findByTestId('user-credits-table').should('have.length', 1);
  });

  /** @test */
  it('Has a PDF of the certificate to download', () => {});

  /** @test */
  it('Disables the download button if the reportback is pending', () => {});

  /** @test */
  it('Enables download once the reportback is approved', () => {});
});

/// <reference types="Cypress" />

import faker from 'faker';
import { userFactory } from '../fixtures/user';

const betaPagePath = '/us/my-voter-registration-drive';

// Mock response for the campaignWebsite query within our BetaVoterRegistrationDrivePageQuery.
const campaignWebsite = {
  campaignId: faker.random.number(),
  title: faker.company.catchPhraseDescriptor(),
  coverImage: {
    url: faker.image.imageUrl(),
    description: faker.company.catchPhraseDescriptor(),
  },
  scholarshipAmount: '1500',
  scholarshipDeadline: '2022-04-25T00:00-08:00',
  additionalContent: null,
};

/**
 * @param Object user
 * @return String
 */
function getBetaPagePathForUser(user) {
  return `${betaPagePath}?referrer_user_id=${user.id}`;
}

describe('Beta Voter Registration Drive Page', () => {
  beforeEach(() => cy.configureMocks());

  it('Beta OVRD page displays NotFoundPage if referrer user ID not present', () => {
    cy.visit(betaPagePath);

    cy.get('[data-test=not-found-page]').should('have.length', 1);
    cy.get('[data-test=alpha-voter-registration-drive-page]').should(
      'have.length',
      0,
    );
  });

  it('Beta OVRD page displays NotFoundPage if referrer user not found', () => {
    const user = userFactory();

    cy.mockGraphqlOp('BetaVoterRegistrationDrivePageQuery', {
      user: null,
      campaignWebsite,
    });

    cy.visit(getBetaPagePathForUser(user));

    cy.get('[data-test=not-found-page]').should('have.length', 1);
    cy.get('[data-test=alpha-voter-registration-drive-page]').should(
      'have.length',
      0,
    );
  });

  it('Beta OVRD HeroSection displays referrer first name if referrer user found', () => {
    const user = userFactory();

    cy.mockGraphqlOp('BetaVoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getBetaPagePathForUser(user));

    cy.get('[data-test=not-found-page]').should('have.length', 0);
    cy.get('[data-test=beta-voter-registration-drive-page]').should(
      'have.length',
      1,
    );
    cy.get('.hero-banner__headline-subtitle').contains(
      `${user.firstName} has invited you to register to vote!`,
    );
  });

  it('Beta OVRD quote displays default if no voting-options query parameter found', () => {
    const user = userFactory();

    cy.mockGraphqlOp('BetaVoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getBetaPagePathForUser(user));

    cy.get(
      '[data-test=beta-voter-registration-drive-page-quote-text]',
    ).contains(
      'Voting is important for young people because we can affect change on issues we care about most.',
    );
    cy.get(
      '[data-test=beta-voter-registration-drive-page-quote-byline]',
    ).contains(`- ${user.firstName}`);
  });
});

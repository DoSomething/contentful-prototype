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

describe('Beta Voter Registration Drive (OVRD) Page', () => {
  beforeEach(() => {
    cy.configureMocks();
    // Mock the ContentBlock queries used for various sections on the beta OVRD page.
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ContentBlock',
        superTitle: faker.lorem.words(),
        title: faker.company.bsBuzz(),
        subTitle: faker.lorem.words(),
        content: faker.lorem.sentence(),
      },
    });
  });

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

  // Eventually the quote will change if a voting-options query parameter exists.
  // @see https://www.pivotaltracker.com/story/show/172087475
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

  it('Beta OVRD HeroSection displays scholarship info in blurb', () => {
    const user = userFactory();

    cy.mockGraphqlOp('BetaVoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(getBetaPagePathForUser(user));

    cy.get('[data-test=beta-voter-registration-drive-page-blurb]').contains(
      `250,000+ young people have registered to vote via DoSomething (it takes less than 2 minutes!). After you register, share with your friends to enter to win a $1,500 scholarship!`,
    );
  });
});

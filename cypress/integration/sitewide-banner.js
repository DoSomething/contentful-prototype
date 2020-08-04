/// <reference types="Cypress" />

import faker from 'faker';

import { userFactory } from '../fixtures/user';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

describe('Site Wide Banner', () => {
  beforeEach(() => {
    cy.configureMocks();

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

  it('The Site Wide Banner is displayed on campaign pages', () => {
    cy.anonVisitCampaign(exampleCampaign);

    if ('#banner-portal > .wrapper > [data-test=site-wide-banner]') {
      cy.get('#banner-portal > .wrapper > [data-test=site-wide-banner]').should(
        'have.length',
        1,
      );
    }
  });

  it('The Site Wide Banner is displayed on campaign pages for authenticated users who are not registered to vote', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegSiteWideBannerQuery', {
      user: {
        voterRegistrationStatus: 'UNREGISTERED',
      },
    });

    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);
    cy.get('#banner-portal > .wrapper > [data-test=site-wide-banner]').should(
      'not.exist',
    );
  });

  it('The Site Wide Banner is not displayed on campaign pages for authenticated users who are registered to vote', () => {
    const user = userFactory();

    cy.mockGraphqlOp('VoterRegSiteWideBannerQuery', {
      user: {
        voterRegistrationStatus: 'REGISTRATION_COMPLETE',
      },
    });

    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);
    cy.get('#banner-portal > .wrapper > [data-test=site-wide-banner]').should(
      'not.exist',
    );
  });

  it('The Site Wide Banner is not displayed on the beta voter registration (OVRD) drive page', () => {
    const user = userFactory();

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
      url: faker.image.imageUrl(),
    };

    cy.mockGraphqlOp('BetaVoterRegistrationDrivePageQuery', {
      user,
      campaignWebsite,
    });

    cy.visit(`/us/my-voter-registration-drive?referrer_user_id=${user.id}`);

    cy.get('#banner-portal > .wrapper > [data-test=site-wide-banner]').should(
      'have.length',
      0,
    );
  });

  /** @test */
  it('The Site Wide Banner is not displayed on voter registration quiz results page', () => {
    const quizResultId = 'p7hqjSP4Y1U6ad0UDz4iS';

    const linkBlock = {
      id: quizResultId,
      __typename: 'LinkBlock',
      title: faker.company.bsBuzz(),
      content: faker.lorem.sentence(),
    };

    cy.mockGraphqlOp('QuizResultPageQuery', {
      block: linkBlock,
    });

    cy.visit(`/us/quiz-results/${quizResultId}`);

    cy.get('#banner-portal > .wrapper > [data-test=site-wide-banner]').should(
      'have.length',
      0,
    );
  });

  /** @test */
  it('The Site Wide Banner CTA URL is correct for an unauthenticated user', () => {
    cy.anonVisitCampaign(exampleCampaign);

    if ('#banner-portal > .wrapper > [data-test=site-wide-banner]') {
      cy.findByTestId('sitewide-banner-button').should('have.length', 1);
      cy.findByTestId('sitewide-banner-button').should(
        'have.attr',
        'href',
        'https://vote.dosomething.org/?r=source:web,source_details:hellobar',
      );
    }
  });

  /** @test */
  it('Sets up the correct tracking source for the RTV redirect URL for an authenticated user', () => {
    const user = userFactory();

    // Log in & visit the campaign pitch page:

    cy.mockGraphqlOp('VoterRegSiteWideBannerQuery', {
      user: {
        voterRegistrationStatus: 'UNREGISTERED',
      },
    });

    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

    if ('#banner-portal > .wrapper > [data-test=site-wide-banner]') {
      cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

    cy.findByTestId('sitewide-banner-button').should('have.length', 1);
    cy.findByTestId('sitewide-banner-button').should(
      'have.attr',
      'href',
      `https://vote.dosomething.org/?r=user:${user.id},source:web,source_details:hellobar`,
    );
  });
});

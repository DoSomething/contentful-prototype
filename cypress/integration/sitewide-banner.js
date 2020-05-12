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
    cy.withState(exampleCampaign)
      .withFeatureFlags({
        sitewide_cta_banner: true,
      })
      .visit('/us/campaigns/test-example-campaign');

    cy.get('#banner-portal > .wrapper > [data-test=site-wide-banner]').should(
      'have.length',
      1,
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
});

/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

describe('Campaign Info Bar', () => {
  beforeEach(() => cy.configureMocks());

  it('Displays the affiliate sponsors or partners', () => {
    const affiliateTitle =
      exampleCampaign.campaign.affiliateSponsors[0].fields.title;

    cy.withState(exampleCampaign).visit('/us/campaigns/test-example-campaign');

    cy.get('.info-bar').should('contain', affiliateTitle);
  });

  context('Unaffiliated users', () => {
    it('Displays a link to the help center', () => {
      cy.anonVisitCampaign(exampleCampaign);

      cy.get('.info-bar .info-bar__secondary a').contains(
        'Visit our Help Center',
      );
    });
  });

  context('Affiliated users', () => {
    it('Displays a button triggering the Zendesk Form in a modal', () => {
      const user = userFactory();
      cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

      cy.get('.info-bar .info-bar__secondary button')
        .contains('button', 'Contact Us')
        .click();

      cy.get('.modal .zendesk-form').contains('h1', 'Contact Us');
    });
  });
});

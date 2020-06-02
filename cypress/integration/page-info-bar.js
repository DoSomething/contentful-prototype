/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';
import exampleStoryPage from '../fixtures/contentful/exampleStoryPage';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';
import { CAMPAIGN_HELP_CONTACT_EMAIL } from '../../resources/assets/constants';

describe('Page Info Bar', () => {
  beforeEach(() => cy.configureMocks());
  context('On a Campaign', () => {
    it('Displays the affiliate sponsors or partners', () => {
      const affiliateTitle =
        exampleCampaign.campaign.affiliateSponsors[0].fields.title;

      cy.withState(exampleCampaign).visit(
        '/us/campaigns/test-example-campaign',
      );

      cy.get('.info-bar').should('contain', affiliateTitle);
    });

    context('Unauthenticated users', () => {
      it("Displays a mailto link to the campaign lead's email address with the campaign title as the subject", () => {
        const campaignLeadEmail =
          exampleCampaign.campaign.campaignLead.fields.email;

        const expectedSubject = encodeURIComponent(
          `Question About ${exampleCampaign.campaign.title}`,
        );

        cy.anonVisitCampaign(exampleCampaign);

        cy.get('.info-bar .info-bar__secondary a')
          .should('have.attr', 'href')
          .and('include', `mailto:${campaignLeadEmail}`)
          .and('include', `?subject=${expectedSubject}`);
      });
    });

    context('Authenticated users', () => {
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

  context('On a Story Page', () => {
    const assertMailtoLink = () => {
      const expectedSubject = encodeURIComponent(
        `Question About ${exampleStoryPage.page.fields.title}`,
      );

      cy.get('.info-bar .info-bar__secondary a')
        .should('have.attr', 'href')
        .and('include', `mailto:${CAMPAIGN_HELP_CONTACT_EMAIL}`)
        .and('include', `?subject=${expectedSubject}`);
    };

    context('Unauthenticated users', () => {
      it('Displays a mailto link to the default help address with the story page title as the subject', () => {
        cy.visit(`/us/${exampleStoryPage.page.fields.slug}`).withState(
          exampleStoryPage,
        );

        assertMailtoLink();
      });
    });

    context('Authenticated users', () => {
      const user = userFactory();

      it('Displays a mailto link to the default help address with the story page title as the subject', () => {
        cy.login(user)
          .visit(`/us/${exampleStoryPage.page.fields.slug}`)
          .withState(exampleStoryPage);

        assertMailtoLink();
      });
    });
  });
});

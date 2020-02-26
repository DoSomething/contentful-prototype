/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

const QUESTION = 'causeyhippo';

describe('Zendesk Modal', () => {
  beforeEach(() => {
    cy.configureMocks();

    const user = userFactory();
    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

    cy.get('.info-bar .info-bar__secondary button')
      .contains('button', 'Contact Us')
      .click();

    cy.get('.modal .zendesk-form').contains('h1', 'Contact Us');
    cy.get('a.zendesk-form__faqs-link')
      .should('have.attr', 'href')
      .and('include', `/us/campaigns/${exampleCampaign.campaign.slug}/faqs`);
  });

  it('Submits a question successfully and displays affirmation', () => {
    cy.route('POST', '/api/v2/zendesk-tickets', []);

    cy.get('.zendesk-form textarea').type(QUESTION);

    cy.get('.zendesk-form button').click();

    cy.get('.zendesk-form h1').contains('Thank You');
  });

  it('Submits a question unsuccessfully and displays error message', () => {
    cy.route({ method: 'POST', url: '/api/v2/zendesk-tickets', status: 500 });

    cy.get('.zendesk-form textarea').type(QUESTION);
    cy.get('.zendesk-form button').click();

    cy.get('.zendesk-form h1').contains('Contact Us');
    cy.get('.zendesk-form').contains('Something went wrong!');
    cy.get('.zendesk-form textarea').contains(QUESTION);
  });
});

/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';
import { HELP_LINK } from '../../resources/assets/constants';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

const QUESTION = 'causeyhippo';

describe('Zendesk Modal', () => {
  const user = userFactory();

  const clickOnTheContactUsLink = () => {
    cy.get('.info-bar .info-bar__secondary button')
      .contains('button', 'Contact Us')
      .click();
  };

  beforeEach(() => {
    cy.configureMocks();

    cy.authVisitCampaignWithoutSignup(user, exampleCampaign);

    clickOnTheContactUsLink();

    cy.get('.modal .zendesk-form').contains('h1', 'Contact Us');
  });

  it('Links to the FAQ page for affiliated users, and the help center for unaffiliated users', () => {
    cy.findByTestId('zendesk-form-faq-link')
      .should('have.attr', 'href')
      .and('include', HELP_LINK);

    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    clickOnTheContactUsLink();

    cy.findByTestId('zendesk-form-faq-link')
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

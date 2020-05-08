/// <reference types="Cypress" />
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

describe('Campaign Info Block', () => {
  beforeEach(() => cy.configureMocks());

  it('Opens the scholarship modal when "View Scholarship Details" is clicked', () => {
    cy.withState(exampleCampaign).visit('/us/campaigns/test-example-campaign');

    cy.get('[data-test=campaign-info-block-container]').should(
      'have.length',
      1,
    );
    cy.contains('button', 'View Scholarship Details').click();
    cy.get('[data-test=campaign-info-block-scholarship-details]').should(
      'have.length',
      1,
    );
    cy.get('.modal-portal > .wrapper.modal-container').click('topRight');
    cy.get('[data-test=campaign-info-block-scholarship-details]').should(
      'have.length',
      0,
    );
  });
});

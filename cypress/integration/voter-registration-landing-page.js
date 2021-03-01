/// <reference types="Cypress" />

describe('Voter Registration Landing Page', () => {
  beforeEach(() => {
    cy.configureMocks();
  });

  /** @test */
  it('Displays the VR landing page with the voter registration form.', () => {
    cy.visit('us/vote');

    cy.findByTestId('vr-landing-page').should('have.length', 1);
    cy.findByTestId('voter-registration-form').should('have.length', 1);
  });

  /** @test */
  it('Uses the r query parameter for source tracking', () => {
    const rQueryParam = 'broadcast_id:123,source:sms_campaign_2024';
    cy.visit(`us/vote?r=${rQueryParam}`);

    cy.findByTestId('voter-registration-tracking-source').should(
      'have.value',
      rQueryParam,
    );
  });
});

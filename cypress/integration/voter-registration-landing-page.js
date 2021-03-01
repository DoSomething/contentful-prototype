/// <reference types="Cypress" />

describe('Voter Registration Landing Page', () => {
  beforeEach(() => {
    cy.configureMocks();
  });

  /** @test */
  it('Displays the VR landing page with the voter registration form.', () => {
    cy.visit('us/vote');

    cy.findByTestId('vr-landing-page').to('have.length', 1);
    cy.findByTestId('voter-registration-form').to('have.length', 1);
  });
});

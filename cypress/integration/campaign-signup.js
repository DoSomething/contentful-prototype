/// <reference types="Cypress" />

describe('Homepage', () => {
  it('Visits a campaign page', () => {
    cy.visit('/us/test-');

    cy.contains("Let's Do This!");
    cy.contains('Explore Campaigns');
    cy.contains('What is DoSomething.org?');
  });
});

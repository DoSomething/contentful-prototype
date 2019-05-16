/// <reference types="Cypress" />

describe('Homepage', () => {
  it('Visits the homepage', () => {
    cy.visit('/');

    cy.contains("Let's Do This!");
    cy.contains('Explore Campaigns');
    cy.contains('What is DoSomething.org?');
  });
});

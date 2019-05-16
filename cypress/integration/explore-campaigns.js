/// <reference types="Cypress" />

describe('Explore Campaigns', () => {
  it('Displays & paginates a list of campaigns', () => {
    cy.visit('/');

    cy.contains('Explore Campaigns').click();
    cy.url().should('include', '/us/campaigns');

    cy.get('.gallery-item').should('have.length', 36);

    cy.contains('Next').click();
    cy.url().should('include', '?page=2');

    cy.contains('Previous').click();
    cy.url().should('include', '?page=1');
  });
});

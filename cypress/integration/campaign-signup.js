/// <reference types="Cypress" />

describe('Homepage', () => {
  it('Visits a campaign page', () => {

    cy.visit('/us/campaigns/test-teens-for-jeans');

    cy.contains('[Test] Teens for Jeans');
    cy.contains("Let's collect another million jeans TOGETHER.");

    cy.contains('button', 'Join Now').click();

    cy.login();
  });
});

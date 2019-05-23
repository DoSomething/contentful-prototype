/// <reference types="Cypress" />

describe('Homepage', () => {
  it('Visits a campaign page', () => {
    cy.server();

    cy.visit('/us/campaigns/test-teens-for-jeans');

    cy.contains('[Test] Teens for Jeans');
    cy.contains("Let's collect another million jeans TOGETHER.");

    cy.contains('button', 'Join Now').click();

    const userId = '555123fffaaabbbcccddd456';
    const phoenixApi = `/api/v2/campaigns/9001`;

    cy.route('GET', `${phoenixApi}/signups?filter[northstar_id]=${userId}`, {
      data: [],
    });

    cy.route('POST', `${phoenixApi}/signups`, {
      data: {
        id: 1420,
        northstar_id: userId,
        campaign_id: '9001',
        campaign_run_id: null,
        quantity: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });

    cy.login(userId);

    cy.contains('Thanks for signing up!');
  });
});

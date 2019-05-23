/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { emptyResponse, existingSignup, newSignup } from '../fixtures/signups';

const API = `/api/v2/campaigns/9001`;
const campaignId = '9001';

describe('Campaign Signup', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => {
    cy.server();
  });

  it('Create signup, as an anonymous user', () => {
    const user = userFactory();

    cy.visit('/us/campaigns/test-teens-for-jeans');

    cy.contains('[Test] Teens for Jeans');
    cy.contains("Let's collect another million jeans TOGETHER.");

    // Mock the responses we'll be expecting once we hit "Join Now":
    cy.route(`${API}/signups?filter[northstar_id]=${user.id}`, emptyResponse);
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

    // We should see the affirmation modal after clicking signup button:
    cy.contains('button', 'Join Now')
      .click()
      .handleLogin(user);

    cy.contains('Thanks for signing up!');
  });

  it('Create signup, as an authenticated user', () => {
    const user = userFactory();

    // Mock the "empty" signup response:
    cy.route(`${API}/signups?filter[northstar_id]=${user.id}`, emptyResponse);

    // Log in & visit the campaign pitch page:
    cy.login(user).visit('/us/campaigns/test-teens-for-jeans');
    cy.contains('[Test] Teens for Jeans');
    cy.contains("Let's collect another million jeans TOGETHER.");

    // Mock the response we'll be expecting once we hit "Join Now":
    cy.route('POST', `${API}/signups`, newSignup(campaignId, user));

    // Click "Join Now" & should get the affirmation modal:
    cy.contains('button', 'Join Now').click();
    cy.get('.card.affirmation').contains('Thanks for signing up!');
  });

  it('Visit with existing signup, as an authenticated user', () => {
    const user = userFactory();

    // Mock the "existing" signup response:
    cy.route(
      `${API}/signups?filter[northstar_id]=${user.id}`,
      existingSignup(campaignId, user),
    );

    // Log in & visit the campaign pitch page:
    cy.login(user).visit('/us/campaigns/test-teens-for-jeans');

    cy.contains('[Test] Teens for Jeans');
    cy.contains("Let's collect another million jeans TOGETHER.");

    // We shouldn't see the pitch page "Join Now" button:
    cy.get('mosaic-lede-banner__signup').should('not.exist');
    cy.get('.card.affirmation').should('not.exist');
  });
});

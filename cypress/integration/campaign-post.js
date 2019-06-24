/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { existingSignup } from '../fixtures/signups';
import { exampleCampaign } from '../fixtures/contentful';
import { newTextPost } from '../fixtures/posts';

const campaignId = '9002';
const SIGNUPS_API = `/api/v2/campaigns/${campaignId}/signups`;
const POSTS_API = `/api/v2/posts`;

describe('Campaign Post', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Create a text post', () => {
    const user = userFactory();

    // Mock the "existing" signup response:
    cy.route(
      `${SIGNUPS_API}?filter[northstar_id]=${user.id}`,
      existingSignup(campaignId, user),
    );

    // Log in & visit the campaign pitch page:
    cy.login(user)
      .withState(exampleCampaign)
      .visit('/us/campaigns/test-example-campaign');

    const text = 'I made my cat a full English breakfast, with coffee & cream.';
    const response = newTextPost(campaignId, user, text);
    cy.route('POST', POSTS_API, response).as('submitPost');

    cy.get('.text-submission-action textarea').type(text);
    cy.get('.text-submission-action button[type="submit"]').click();

    cy.contains('We got your message!');
  });
});

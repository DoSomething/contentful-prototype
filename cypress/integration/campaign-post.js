/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';
import { existingSignup } from '../fixtures/signups';
import { exampleCampaign } from '../fixtures/contentful';
import { newTextPost, newPhotoPost } from '../fixtures/posts';

const campaignId = '9002';
const SIGNUPS_API = `/api/v2/campaigns/${campaignId}/signups`;
const CAMPAIGN_POSTS_API = `/api/v2/campaigns/${campaignId}/posts`;
const POSTS_API = `/api/v2/posts`;

describe('Campaign Post', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Create a text post', () => {
    const user = userFactory();

    // Log in & visit the campaign action page:
    cy.login(user)
      .withState(exampleCampaign)
      .withSignup(exampleCampaign.campaign.campaignId)
      .visit('/us/campaigns/test-example-campaign');

    const text = 'I made my cat a full English breakfast, with coffee & cream.';
    const response = newTextPost(campaignId, user, text);
    cy.route('POST', POSTS_API, response).as('submitPost');

    cy.get('.text-submission-action textarea').type(text);
    cy.get('.text-submission-action button[type="submit"]').click();

    cy.contains('We got your message!');
  });

  it('Create a photo post', () => {
    const user = userFactory();

    // Log in & visit the campaign action page:
    cy.login(user)
      .withState(exampleCampaign)
      .withSignup(exampleCampaign.campaign.campaignId)
      .visit('/us/campaigns/test-example-campaign');

    cy.get('.photo-submission-action').within(() => {
      // Choose an image to upload as a photo post:
      const fileName = 'upload.jpg';
      cy.fixture(fileName).then(fileContent => {
        const payload = { fileContent, fileName, mimeType: 'image/jpeg' };
        cy.get('input[type="file"]').upload(payload, { subjectType: 'input' });
      });

      // Fill out other fields:
      cy.get('[name="caption"]').type("Let's do this!");
      cy.get('[name="quantity"]').type('1');
      cy.get('[name="whyParticipated"]').type('Testing');

      // Mock the backend response:
      const response = newPhotoPost(campaignId, user);
      cy.route('POST', CAMPAIGN_POSTS_API, response).as('submitPost');

      // Submit the form, and assert we made the API request:
      cy.contains('Submit a new photo').click();
      cy.wait('@submitPost');
    });

    // We should see the affirmation modal after submitting a post:
    cy.contains('We got your photo!');
  });
});

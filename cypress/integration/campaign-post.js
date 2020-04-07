/// <reference types="Cypress" />

import { MockList } from 'graphql-tools';
import { userFactory } from '../fixtures/user';
import { campaignId } from '../fixtures/constants';
import { existingSignup } from '../fixtures/signups';
import { newTextPost, newPhotoPost } from '../fixtures/posts';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

const SIGNUPS_API = `/api/v2/campaigns/${campaignId}/signups`;
const CAMPAIGN_POSTS_API = `/api/v2/campaigns/${campaignId}/posts`;
const POSTS_API = `/api/v2/posts`;

describe('Campaign Post', () => {
  // Configure a new "mock" server before each test:
  beforeEach(() => cy.configureMocks());

  it('Create a text post', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ActionAndUserByIdQuery', {
      action: {
        collectSchoolId: false,
      },
      user: {
        schoolId: null,
      },
    });

    // Log in & visit the campaign action page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    const text = 'I made my cat a full English breakfast, with coffee & cream.';
    const response = newTextPost(campaignId, user, text);
    cy.route('POST', POSTS_API, response).as('submitPost');

    cy.get('.text-submission-action textarea').type(text);
    cy.get('.text-submission-action button[type="submit"]').click();

    cy.contains('We got your message!');
  });

  it('Shows any existing posts', () => {
    const user = userFactory();

    cy.mockGraphqlOp('SubmissionGalleryQuery', {
      posts: (root, { actionIds, type }) => [
        {
          type,
          actionId: actionIds[0],
          user: { firstName: 'Puppet' },
          status: 'PENDING',
        },
      ],
    });

    // Log in & visit the campaign action page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    // We should see one "pending" post for each uploader:
    // @TODO: We need a better selector for this "entire" block...
    cy.get('[data-contentful-id=3Au9UnzEBGMHjwlBSujlv5] .post').should(
      'have.length',
      1,
    );
    cy.get('[data-contentful-id=6fKwdXz8gYyqJiy42R5c3h] .post').should(
      'have.length',
      1,
    );
  });

  it('Create a photo post', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ActionAndUserByIdQuery', {
      action: {
        collectSchoolId: false,
      },
      user: {
        schoolId: null,
      },
    });

    // Log in & visit the campaign action page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.get('.photo-submission-action .card').should('have.length', 1);
    cy.get('.photo-submission-form').should('have.length', 1);
    cy.get('.photo-submission-form .media-uploader').should('have.length', 1);
    cy.get('.photo-submission-form .button').should('have.length', 1);

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
      cy.route('POST', POSTS_API, response).as('submitPost');

      // Submit the form, and assert we made the API request:
      cy.contains('Submit a new photo').click();
      cy.wait('@submitPost');
    });

    // We should see the affirmation modal after submitting a post:
    cy.contains('We got your photo!');
  });
});

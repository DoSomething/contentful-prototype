/// <reference types="Cypress" />

import { MockList } from 'graphql-tools';
import { userFactory } from '../fixtures/user';
import { existingSignup } from '../fixtures/signups';
import { campaignId, POSTS_API } from '../fixtures/constants';
import { newTextPost, newPhotoPost } from '../fixtures/posts';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

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

  it('Create a petition-text post', () => {
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

    cy.get('.petition-submission-action textarea').type(text);
    cy.get('.petition-submission-action button[type="submit"]').click();

    cy.contains('Thanks for signing the petition!');
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

    cy.mockGraphqlOp('ActionQuery', {
      action: {
        volunteerCredit: false,
      },
    });

    // Log in & visit the campaign action page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.get('.photo-submission-action').within(() => {
      cy.get('.card').should('have.length', 1);

      cy.get('.photo-submission-form').within(() => {
        cy.findByTestId('media-uploader').should('have.length', 1);
        cy.get('button[type="submit"]').should('have.length', 1);
      });

      // Choose an image to upload as a photo post:
      cy.get('input[type="file"]').attachFile('upload.jpg');

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

  it('displays link to help center along with photo dimension errors', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ActionAndUserByIdQuery', {
      action: {
        collectSchoolId: false,
      },
      user: {
        schoolId: null,
      },
    });

    cy.mockGraphqlOp('ActionQuery', {
      action: {
        volunteerCredit: false,
      },
    });

    // Log in & visit the campaign action page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.get('.photo-submission-action').within(() => {
      // Choose an image to upload as a photo post:
      cy.get('input[type="file"]').attachFile('upload.jpg');

      // Fill out other fields:
      cy.get('[name="caption"]').type("Let's do this!");
      cy.get('[name="quantity"]').type('1');
      cy.get('[name="whyParticipated"]').type('Testing');

      const photoDimensionValidationError =
        'Photos must be no larger than 10MB, at least 50 x 50, and no larger than 5000 x 4000. Try cropping your photo.';

      // Mock the backend response:
      cy.intercept('POST', POSTS_API, {
        statusCode: 422,
        body: {
          error: {
            message: 'Hmm, there were some issues with your submission.',
            fields: {
              file: [photoDimensionValidationError],
            },
          },
        },
      }).as('submitPost');

      cy.contains('Submit a new photo').click();

      cy.wait('@submitPost');

      cy.contains(photoDimensionValidationError);

      cy.findByTestId('photo-dimensions-help-center-link').should(
        'have.length',
        1,
      );
    });
  });

  context('For a volunteer credit action', () => {
    const user = userFactory();

    it('displays the hours_spent reportback field', () => {
      cy.mockGraphqlOp('ActionAndUserByIdQuery', {
        action: {
          collectSchoolId: false,
        },
        user: {
          schoolId: null,
        },
      });

      cy.mockGraphqlOp('ActionQuery', {
        action: {
          volunteerCredit: true,
        },
      });

      // Log in & visit the campaign action page:
      cy.authVisitCampaignWithSignup(user, exampleCampaign);

      cy.findByTestId('hours_spent').should('have.length', 1);

      cy.get('.photo-submission-action').within(() => {
        // Choose an image to upload as a photo post:
        cy.get('input[type="file"]').attachFile('upload.jpg');

        // Fill out other fields:
        cy.get('[name="caption"]').type("Let's do this!");
        cy.get('[name="quantity"]').type('1');
        cy.get('[name="hours"]').type('1');
        cy.get('[name="minutes"]').type('30');
        cy.get('[name="whyParticipated"]').type('Testing');

        // Mock the backend response:
        const response = newPhotoPost(campaignId, user);
        cy.route('POST', POSTS_API, response).as('submitPost');

        // Submit the form, and assert we made the API request
        // with the correct calculated hours_spent value:
        cy.contains('Submit a new photo').click();
        cy.wait('@submitPost')
          .then(post => {
            return post.request.body.get('hours_spent');
          })
          .should('equal', '1.5');
      });

      // We should see the affirmation modal after submitting a post:
      cy.contains('We got your photo!');
    });
  });

  context('For a non volunteer credit action', () => {
    const user = userFactory();

    it('Does not display the hours_spent reportback field', () => {
      cy.mockGraphqlOp('ActionAndUserByIdQuery', {
        action: {
          collectSchoolId: false,
        },
        user: {
          schoolId: null,
        },
      });

      cy.mockGraphqlOp('ActionQuery', {
        action: {
          volunteerCredit: false,
        },
      });

      // Log in & visit the campaign action page:
      cy.authVisitCampaignWithSignup(user, exampleCampaign);

      cy.findByTestId('hours_spent').should('have.length', 0);
    });
  });

  context('When the post_confirmation_page feature flag is on', () => {
    it('Redirects to the show submission page after a successful text post submission', () => {
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
      cy.withFeatureFlags({
        post_confirmation_page: true,
      }).authVisitCampaignWithSignup(user, exampleCampaign);

      const text =
        'I made my cat a full English breakfast, with coffee & cream.';
      const response = newTextPost(campaignId, user, text);
      cy.route('POST', POSTS_API, response).as('submitPost');

      cy.mockGraphqlOp('PostQuery', {
        post: {
          userId: user.id,
        },
      });

      cy.get('.text-submission-action textarea').type(text);
      cy.get('.text-submission-action button[type="submit"]').click();
      cy.wait('@submitPost');

      // We should be redirected to the show submission page after submitting a post.
      cy.location('pathname').should('eq', `/us/posts/${response.data.id}`);
      // We should have appended the Photo Submission Action ID as a query parameter.
      cy.location('search').should('eq', '?submissionActionId=id');

      cy.contains('We Got Your Submission');
    });

    it('Redirects to the show submission page after a successful photo post submission', () => {
      const user = userFactory();

      cy.mockGraphqlOp('ActionAndUserByIdQuery', {
        action: {
          collectSchoolId: false,
        },
        user: {
          schoolId: null,
        },
      });

      cy.mockGraphqlOp('ActionQuery', {
        action: {
          volunteerCredit: false,
        },
      });

      // Log in & visit the campaign action page:
      cy.withFeatureFlags({
        post_confirmation_page: true,
      }).authVisitCampaignWithSignup(user, exampleCampaign);

      cy.get('.photo-submission-action').within(() => {
        // Choose an image to upload as a photo post:
        cy.get('input[type="file"]').attachFile('upload.jpg');

        // Fill out other fields:
        cy.get('[name="caption"]').type("Let's do this!");
        cy.get('[name="quantity"]').type('1');
        cy.get('[name="whyParticipated"]').type('Testing');

        // Mock the backend response:
        const response = newPhotoPost(campaignId, user);
        cy.route('POST', POSTS_API, response).as('submitPost');

        cy.mockGraphqlOp('PostQuery', {
          post: {
            userId: user.id,
          },
        });

        // Submit the form, and assert we made the API request:
        cy.contains('Submit a new photo').click();
        cy.wait('@submitPost');

        // We should be redirected to the show submission page after submitting a post.
        cy.location('pathname').should('eq', `/us/posts/${response.data.id}`);
        // We should have appended the Photo Submission Action ID as a query parameter.
        cy.location('search').should('eq', '?submissionActionId=id');
      });

      cy.contains('We Got Your Submission');
    });

    it('Redirects to the show submission page after a successful petition post submission', () => {
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
      cy.withFeatureFlags({
        post_confirmation_page: true,
      }).authVisitCampaignWithSignup(user, exampleCampaign);

      const text =
        'I made my cat a full English breakfast, with coffee & cream.';
      const response = newTextPost(campaignId, user, text);
      cy.route('POST', POSTS_API, response).as('submitPost');

      cy.mockGraphqlOp('PostQuery', {
        post: {
          userId: user.id,
        },
      });

      cy.get('.petition-submission-action textarea').type(text);
      cy.get('.petition-submission-action button[type="submit"]').click();

      cy.wait('@submitPost');

      // We should be redirected to the show submission page after submitting a post.
      cy.location('pathname').should('eq', `/us/posts/${response.data.id}`);
      // We should have appended the Photo Submission Action ID as a query parameter.
      cy.location('search').should('eq', '?submissionActionId=id');

      cy.contains('We Got Your Submission');
    });
  });
});

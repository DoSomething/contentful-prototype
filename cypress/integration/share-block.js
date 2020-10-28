/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';

import { newSharePost } from '../fixtures/posts';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';
import { CAMPAIGN_POSTS_API, POSTS_API } from '../fixtures/constants';

const blockId = '2T5ARr1AViKw2Kw0Q4S0so';

describe('Share Action', () => {
  beforeEach(() => {
    cy.configureMocks();

    // Mock the Facebook share UI so that we can test successful Facebook posts.
    cy.on('window:before:load', window => {
      window.FB = {
        ui: cy.stub((share, callback) => {
          callback(true);
        }),
      };
    });
  });

  /** @test */
  it("posts successful Facebook share to Rogue for authenticated users when there's an Action ID provided", () => {
    const user = userFactory();
    const actionId = 1;

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ShareBlock',
        socialPlatform: ['facebook'],
        affirmationBlock: null,
        actionId,
      },
    });

    cy.authVisitBlockPermalink(user, blockId);

    cy.route('POST', POSTS_API, newSharePost(user)).as('submitPost');

    cy.findByTestId('share-action-button').click();

    cy.wait('@submitPost');
  });

  /** @test */
  it("posts successful Facebook share to Rogue for authenticated users when there's a Campaign ID provided (via Redux State, e.g. campaign pages)", () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ShareBlock',
        socialPlatform: ['facebook'],
        affirmationBlock: null,
        // For many older Share Actions in Contentful, the actionId won't be filled in.
        actionId: null,
      },
    });

    // We add a campaign to the "State" to mock the environment of a Campaign Page,
    // where the campaign ID will be passed through to the Share Action.
    cy.authVisitBlockPermalink(user, blockId, exampleCampaign);

    // Since there's a campaign ID instead of an action ID, this POST request
    // should be made to Rogue's Campaign API endpoint specifically.
    cy.route('POST', CAMPAIGN_POSTS_API, newSharePost(user)).as('submitPost');

    cy.findByTestId('share-action-button').click();

    cy.wait('@submitPost');
  });
});

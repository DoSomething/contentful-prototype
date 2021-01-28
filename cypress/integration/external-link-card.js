/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';

describe('External Link Card', () => {
  beforeEach(() => cy.configureMocks());

  const blockId = 'abcdefghi123456789';

  it('renders the provider name, title, description, and image in the external link card', () => {
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ExternalLinkBlock',
        title: null,
        description: null,
        image: null,
      },
    });

    const providerName = 'External Website';
    const title = 'We provide external content via the world wide web.';
    const description =
      "Through decades of user research, we've optimized the cloud to data model the analytics with precision.";
    const thumbnailUrl = 'https://via.placeholder.com/350x150';

    cy.mockGraphqlOp('ExternalLinkQuery', {
      embed: {
        providerName,
        title,
        description,
        thumbnailUrl,
      },
    });

    cy.visit(`us/blocks/${blockId}`);

    cy.findByTestId('external-link-card').within(() => {
      cy.findByTestId('external-link-provider-image').should(
        'have.attr',
        'src',
        thumbnailUrl,
      );
      cy.findByTestId('external-link-provider-name').contains(providerName);
      cy.findByTestId('external-link-title').contains(title);
      cy.findByTestId('external-link-description').contains(description);
    });
  });

  /** @test */
  it('renders the customized title, description, image if assigned', () => {
    const providerName = 'External Website';
    const title = 'Check out this website!';
    const description =
      'They have some volunteer opportunities that are almost as cool as ours.';
    const image = { url: 'https://via.placeholder.com/350x150' };

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'ExternalLinkBlock',
        title,
        description,
        image,
      },
    });

    cy.mockGraphqlOp('ExternalLinkQuery', {
      embed: {
        providerName,
        title: 'something else.',
        description: 'not this!',
        thumbnailUrl: 'broken.org',
      },
    });

    cy.visit(`us/blocks/${blockId}`);

    cy.findByTestId('external-link-card').within(() => {
      cy.findByTestId('external-link-custom-image').should(
        'have.attr',
        'src',
        // image src should be formatted for Contentful API.
        `${image.url}?fit=fill&h=205&w=365`,
      );
      cy.findByTestId('external-link-provider-name').contains(providerName);
      cy.findByTestId('external-link-title').contains(title);
      cy.findByTestId('external-link-description').contains(description);
    });
  });
});

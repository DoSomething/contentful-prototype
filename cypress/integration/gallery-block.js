/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';

describe('Gallery Block', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('renders a ContentBlockGalleryItem component for "CONTENT_BLOCK" blocks', () => {
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'GalleryBlock',
        galleryType: 'CONTENT_BLOCK',
        blocks: [{ __typename: 'ContentBlock' }],
      },
    });

    cy.visit('us/blocks/abcdefghi123456789');

    cy.findByTestId('content-block-gallery-item');
  });

  /** @test */
  it('renders a ExternalLinkCard component for "EXTERNAL_LINK" blocks', () => {
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'GalleryBlock',
        galleryType: 'EXTERNAL_LINK',
        blocks: [{ __typename: 'ExternalLinkBlock' }],
      },
    });

    cy.visit('us/blocks/abcdefghi123456789');

    cy.findByTestId('content-block-gallery-item').within(() => {
      cy.findByTestId('external-link-card');
    });
  });
});

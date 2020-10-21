/// <reference types="Cypress" />
import { userFactory } from '../fixtures/user';

describe('Gallery Block', () => {
  beforeEach(() => cy.configureMocks());

  const blockId = 'abcdefghi123456789';

  /** @test */
  it.only('renders a ContentBlockGalleryItem component for "EXTERNAL_LINK" blocks', () => {
    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        __typename: 'GalleryBlock',
        galleryType: 'EXTERNAL_LINK',
        blocks: [{ __typename: 'ContentBlock' }],
      },
    });

    cy.visit(`us/blocks/${blockId}`);

    cy.findByTestId('content-block-gallery-item');
  });

  // @TODO: Activate this test once we've deployed https://git.io/JTuoE and pulled in the new schema.
  // /** @test */
  // it.only('renders a ContentBlockGalleryItem component for "CONTENT_BLOCK" blocks', () => {
  //   cy.mockGraphqlOp('ContentfulBlockQuery', {
  //     block: {
  //       __typename: 'GalleryBlock',
  //       galleryType: 'CONTENT_BLOCK',
  //       blocks: [{ __typename: 'ContentBlock' }],
  //     },
  //   });

  //   cy.visit(`us/blocks/${blockId}`);

  //   cy.findByTestId('content-block-gallery-item');
  // });
});

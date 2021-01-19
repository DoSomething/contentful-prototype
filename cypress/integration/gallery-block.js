// /// <reference types="Cypress" />
// import { userFactory } from '../fixtures/user';

// describe('Gallery Block', () => {
//   beforeEach(() => cy.configureMocks());

//   /** @test */
//   it('renders a ContentBlockGalleryItem component for "CONTENT_BLOCK" blocks', () => {
//     cy.mockGraphqlOp('ContentfulBlockQuery', {
//       block: {
//         __typename: 'GalleryBlock',
//         galleryType: 'CONTENT_BLOCK',
//         blocks: [{ __typename: 'ContentBlock' }],
//       },
//     });

//     cy.visit('us/blocks/abcdefghi123456789');

//     cy.findByTestId('content-block-gallery-item');
//   });
// });

// /// <reference types="Cypress" />
// import { userFactory } from '../fixtures/user';

// describe('Embed Block', () => {
//   beforeEach(() => cy.configureMocks());

//   const blockId = 'abcdefghi123456789';

//   /** @test */
//   it('renders a Typeform embed for Typeform URLs with the user ID as a hidden field', () => {
//     const typeformUrl = 'https://dosomething.typeform.com/to/iEdy7C';
//     cy.mockGraphqlOp('ContentfulBlockQuery', {
//       block: {
//         __typename: 'EmbedBlock',
//         url: typeformUrl,
//       },
//     });

//     const user = userFactory();
//     cy.authVisitBlockPermalink(user, '123');

//     cy.findByTestId('typeform-embed').within(() => {
//       cy.get('iframe')
//         .should('have.attr', 'src')
//         .and('include', `${typeformUrl}?northstar_id=${user.id}`);
//     });
//   });

//   /** @test */
//   it('renders a Carto embed for DoSomething Carto URLs', () => {
//     const cartoUrl =
//       'https://dosomething.carto.com/builder/3b797fe5-1f25-4052-92dc-7e97a8f0b986/embed';

//     cy.mockGraphqlOp('ContentfulBlockQuery', {
//       block: {
//         __typename: 'EmbedBlock',
//         url: cartoUrl,
//       },
//     });

//     cy.visit(`us/blocks/${blockId}`);

//     cy.findByTestId('iframe-embed').within(() => {
//       cy.get('iframe')
//         .should('have.attr', 'src')
//         .and('include', cartoUrl);
//     });
//   });

//   /** @test */
//   it('renders a Carto embed for Carto URLs', () => {
//     const cartoUrl =
//       'https://dosomething.carto.com/builder/3b797fe5-1f25-4052-92dc-7e97a8f0b986/embed';

//     cy.mockGraphqlOp('ContentfulBlockQuery', {
//       block: {
//         __typename: 'EmbedBlock',
//         url: cartoUrl,
//       },
//     });

//     cy.visit(`us/blocks/${blockId}`);

//     cy.findByTestId('iframe-embed').within(() => {
//       cy.get('iframe')
//         .should('have.attr', 'src')
//         .and('include', cartoUrl);
//     });
//   });

//   /** @test */
//   it('renders an Airtable embed for Airtable URLs', () => {
//     const airtable = 'https://airtable.com/embed/shrDyCtavinDhE2jt';

//     cy.mockGraphqlOp('ContentfulBlockQuery', {
//       block: {
//         __typename: 'EmbedBlock',
//         url: airtable,
//       },
//     });

//     cy.visit(`us/blocks/${blockId}`);

//     cy.findByTestId('iframe-embed').within(() => {
//       cy.get('iframe')
//         .should('have.attr', 'src')
//         .and('include', airtable);
//     });
//   });

//   context('Default URLs', () => {
//     /** @test */
//     it('renders an Embed link if no HTML provided', () => {
//       const url = 'https://vote.dosomething.org';

//       cy.mockGraphqlOp('ContentfulBlockQuery', {
//         block: {
//           __typename: 'EmbedBlock',
//           url,
//         },
//       });

//       const embedTitle = 'Vote!';
//       const embedDescription = 'Cast your vote and your soul is safe.';
//       const embedProviderName = 'Puppet Sloth';

//       cy.mockGraphqlOp('EmbedQuery', {
//         embed: {
//           title: embedTitle,
//           providerName: embedProviderName,
//           description: embedDescription,
//           html: null,
//         },
//       });

//       cy.visit(`us/blocks/${blockId}`);

//       cy.findByTestId('embed').within(() => {
//         cy.get('a')
//           .should('have.attr', 'href')
//           .and('include', url);

//         cy.findByTestId('embed-title').contains(embedTitle);
//         cy.findByTestId('embed-description').contains(embedDescription);
//         cy.findByTestId('embed-provider-name').contains(embedProviderName);
//         cy.findByTestId('embed-badge');
//       });
//     });

//     it('renders the provided HTML', () => {
//       cy.mockGraphqlOp('ContentfulBlockQuery', {
//         block: {
//           __typename: 'EmbedBlock',
//           url: 'https://www.youtube.com/watch?v=jtzr1cOPvfU',
//         },
//       });

//       const providerHTML =
//         '<h1 data-testid="provider-html">I am provider HTML. Embed me please, k thx.</h1>';

//       cy.mockGraphqlOp('EmbedQuery', {
//         embed: {
//           html: providerHTML,
//         },
//       });

//       cy.visit(`us/blocks/${blockId}`);

//       cy.findByTestId('embed').within(() => {
//         cy.findByTestId('embed-html').within(() => {
//           cy.findByTestId('provider-html');
//         });
//       });
//     });
//   });
// });

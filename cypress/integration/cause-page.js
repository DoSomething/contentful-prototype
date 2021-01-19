// /// <reference types="Cypress" />
// import { GraphQLError } from 'graphql';

// describe('Cause Page', () => {
//   // Configure a new "mock" server before each test:
//   beforeEach(() => cy.configureMocks());

//   /** @test */
//   it('Visit a non existent cause page', () => {
//     cy.mockGraphqlOp('CausePageQuery', {
//       causePageBySlug: null,
//     });

//     cy.visit('/us/causes/not-found');

//     cy.contains('Not Found');
//   });

//   /** @test */
//   it('Visit a cause page with a triggered GraphQL error', () => {
//     cy.mockGraphqlOp('CausePageQuery', {
//       causePageBySlug: new GraphQLError('Oops!... I Did It Again'),
//     });

//     cy.visit('/us/causes/error');

//     cy.contains('Something went wrong');
//   });

//   /** @test */
//   it('Visit a working cause page', () => {
//     const superTitle = "Let's do something about the";
//     const title = 'Environment';

//     cy.mockGraphqlOp('CausePageQuery', {
//       causePageBySlug: {
//         superTitle,
//         title,
//         slug: 'education',
//       },
//     });

//     cy.visit('/us/causes/education');

//     cy.contains('h2', superTitle);
//     cy.contains('h1', title);
//   });

//   /** @test */
//   it('Displays list of stats in the banner', () => {
//     cy.mockGraphqlOp('CausePageQuery', {
//       causePageBySlug: {
//         superTitle: 'Super Title',
//         title: 'Title',
//         slug: 'education',
//         additionalContent: {
//           statsBackgroundColor: '#3D9CB1',
//           stats: [
//             {
//               link: {
//                 url:
//                   'https://www.dosomething.org/us/campaigns/company-student-debt',
//                 text: 'Invest In Us',
//               },
//               title: 'actions taken about student debt',
//               number: 59077,
//             },
//             {
//               link: {
//                 url:
//                   'https://www.dosomething.org/us/stories/legacy-donor-admissions',
//                 text: 'Merit Over Money',
//               },
//               title: 'signatures for fairer admissions',
//               number: 27711,
//             },
//             {
//               link: {
//                 url: 'https://www.dosomething.org/us/campaigns/fed/community',
//                 text: 'Fed Up',
//               },
//               title: 'votes for better school lunches',
//               number: 576846,
//             },
//           ],
//         },
//       },
//     });

//     cy.visit('/us/causes/education');

//     cy.findByTestId('curated-page-banner-stats');
//     cy.findAllByTestId('stat-card').should('have.length', 3);
//   });

//   /** @test */
//   it('Displays paginated campaign gallery', () => {
//     cy.mockGraphqlOp('CausePageQuery', {
//       causePageBySlug: {
//         slug: 'education',
//       },
//     });

//     // Stub the query to have a 'next page' so we show the 'view more' button.
//     cy.mockGraphqlOp('PaginatedCampaignQuery', {
//       paginatedCampaigns: {
//         pageInfo: {
//           hasNextPage: true,
//         },
//       },
//     });

//     cy.visit('/us/causes/education');

//     cy.findByTestId('paginated-campaign-gallery').within(() => {
//       // Find the 'view more' button.
//       cy.get('button').then($viewMorebutton => {
//         // Now let's ensure that there's *not* another page once we click 'view more'.
//         cy.mockGraphqlOp('PaginatedCampaignQuery', {
//           paginatedCampaigns: {
//             pageInfo: {
//               hasNextPage: false,
//             },
//           },
//         });

//         $viewMorebutton.click();

//         // The button should no longer display.
//         cy.get($viewMorebutton.selector).should('not.exist');
//       });
//     });
//   });

//   /** @test */
//   it('Does not display group campaigns', () => {
//     cy.mockGraphqlOp('CausePageQuery', {
//       causePageBySlug: {
//         slug: 'education',
//       },
//     });

//     // Stub the query to have a 'next page' so we show the 'view more' button.
//     cy.mockGraphqlOp('PaginatedCampaignQuery', {
//       paginatedCampaigns: {
//         edges: [
//           {
//             node: {
//               id: 1,
//               groupTypeId: null,
//             },
//           },
//           {
//             node: {
//               id: 2,
//               groupTypeId: null,
//             },
//           },
//           {
//             node: {
//               id: 3,
//               groupTypeId: 1,
//             },
//           },
//         ],
//         pageInfo: {
//           hasNextPage: true,
//         },
//       },
//     });

//     cy.withSiteConfig({ hide_campaign_ids: [] }).visit('/us/causes/education');

//     cy.findAllByTestId('campaign-card').should('have.length', 2);
//   });

//   /** @test */
//   it('Does not display campaigns with IDs listed as "hidden"', () => {
//     cy.mockGraphqlOp('CausePageQuery', {
//       causePageBySlug: {
//         slug: 'education',
//       },
//     });

//     // Stub the query to have a 'next page' so we show the 'view more' button.
//     cy.mockGraphqlOp('PaginatedCampaignQuery', {
//       paginatedCampaigns: {
//         edges: [
//           {
//             node: {
//               id: 1,
//               groupTypeId: null,
//             },
//           },
//           {
//             node: {
//               id: 2,
//               groupTypeId: null,
//             },
//           },
//           {
//             node: {
//               id: 3,
//               groupTypeId: 1,
//             },
//           },
//         ],
//         pageInfo: {
//           hasNextPage: true,
//         },
//       },
//     });

//     cy.withSiteConfig({ hide_campaign_ids: [1] }).visit('/us/causes/education');

//     cy.findAllByTestId('campaign-card').should('have.length', 1);
//   });
// });

// /// <reference types="Cypress" />

// import { userFactory } from '../fixtures/user';

// const blockId = '1234';

// const club = { id: 1, name: 'Test Club', location: 'US-NY', city: 'NYC' };

// describe('Current Club Block', () => {
//   beforeEach(() => {
//     cy.configureMocks();
//     cy.mockGraphqlOp('ContentfulBlockQuery', {
//       block: {
//         __typename: 'CurrentClubBlock',
//       },
//     });
//   });

//   context('Authenticated users', () => {
//     /** @test */
//     it("See their club if they've already joined one", () => {
//       const user = userFactory();

//       cy.mockGraphqlOp('UserClubQuery', { user: { club } });

//       cy.authVisitBlockPermalink(user, blockId);

//       cy.findByTestId('current-club-form').should('have.length', 0);
//       cy.findByTestId('current-club').within(() => {
//         cy.findByTestId('current-club-name').contains(club.name);
//       });
//     });

//     /** @test */
//     it("See the club form if they haven't joined one, and can select a club to join", () => {
//       const user = userFactory();

//       cy.mockGraphqlOp('UserClubQuery', { user: { club: null } });

//       cy.mockGraphqlOp('SearchClubsQuery', { clubs: [club] });

//       cy.authVisitBlockPermalink(user, blockId);

//       cy.findByTestId('current-club').should('have.length', 0);
//       cy.findByTestId('current-club-form').should('have.length', 1);

//       cy.findByTestId('current-club-form-submit').should('be.disabled');

//       cy.findByTestId('current-club-form').within(() => {
//         cy.get('#react-select-2-input').type('test', {
//           force: true,
//         });

//         cy.get('#react-select-2-option-0').click({ force: true });

//         cy.findByTestId('current-club-form-submit').should('be.enabled');

//         cy.mockGraphqlOp('UserClubQuery', { user: { club } });

//         cy.findByTestId('current-club-form-submit').click();
//       });

//       cy.findByTestId('current-club-form').should('have.length', 0);
//       cy.findByTestId('current-club').within(() => {
//         cy.findByTestId('current-club-name').contains(club.name);
//       });
//     });
//   });

//   context('Unauthenticated users', () => {
//     // @TODO: Fix this test to authenticate the user and see if the mutation runs with their selected club ID.
//     /** @test */
//     xit('Can join a club via "lazy authentication"', () => {
//       const user = userFactory();

//       cy.visit(`/us/blocks/${blockId}`);

//       cy.mockGraphqlOp('SearchClubsQuery', { clubs: [club] });

//       cy.findByTestId('current-club').should('have.length', 0);
//       cy.findByTestId('current-club-form').should('have.length', 1);

//       cy.findByTestId('current-club-form-submit').should('be.disabled');

//       cy.findByTestId('current-club-form').within(() => {
//         cy.get('#react-select-2-input').type('test', {
//           force: true,
//         });

//         cy.get('#react-select-2-option-0').click({ force: true });

//         cy.findByTestId('current-club-form-submit').should('be.enabled');

//         cy.mockGraphqlOp('UserClubQuery', { user: { club: null } });

//         cy.findByTestId('current-club-form-submit').click(); // @TODO: This doesn't work: .handleLogin(user);
//       });

//       cy.findByTestId('current-club-form').should('have.length', 0);
//       cy.findByTestId('current-club').within(() => {
//         cy.findByTestId('current-club-name').contains(club.name);
//       });
//     });
//   });
// });

// /// <reference types="Cypress" />

// import { userFactory } from '../fixtures/user';

// describe('User Account Refer A Friend Tab', () => {
//   beforeEach(() => cy.configureMocks());

//   /** @test */
//   it('Displays correct information for non incentive version', () => {
//     const user = userFactory();

//     cy.login(user);
//     cy.visit(`/us/account/refer-friends`);
//     cy.contains('Get Your Friends Involved');
//     cy.findByTestId('refer-a-friend-regular-details').should('have.length', 1);
//   });

//   /** @test */
//   it('Displays correct information for incentive version', () => {
//     const user = userFactory();

//     cy.login(user);
//     cy.withFeatureFlags({ refer_friends_incentive: true }).visit(
//       `/us/account/refer-friends`,
//     );
//     cy.contains('Enter to win a $10 gift card');
//     cy.findByTestId('refer-a-friend-incentive-details').should(
//       'have.length',
//       1,
//     );
//     cy.findByTestId('refer-a-friend-receive-incentive-details').should(
//       'have.length',
//       1,
//     );
//   });

//   /** @test */
//   it('Links to the correct official rules', () => {
//     const user = userFactory();

//     cy.login(user);
//     cy.visit(`/us/account/refer-friends`);
//     cy.findByTestId('refer-a-friend-official-rules').should(
//       'have.attr',
//       'href',
//       '/us/refer-a-friend-official-rules',
//     );
//   });

//   /** @test */
//   // Not fully testing out the signup referral block as it already has stand alone testing
//   it('Shows users referrals', () => {
//     const user = userFactory();

//     cy.login(user);
//     cy.visit(`/us/account/refer-friends`);
//     cy.findByTestId('referrals-count-description').should('have.length', 1);
//   });
// });

// /// <reference types="Cypress" />

// import { userFactory } from '../fixtures/user';

// describe('User Account Email Subscriptions Tab', () => {
//   // Configure a new "mock" server before each test:
//   beforeEach(() => cy.configureMocks());

//   it('View existing subscriptions', () => {
//     // This user is just for auth purposes
//     const user = userFactory();

//     cy.mockGraphqlOp('AccountQuery', {
//       // Get back a particular user and subscription topics
//       user: {
//         firstName: 'Delilah',
//         emailSubscriptionTopics: ['COMMUNITY', 'NEWS', 'LIFESTYLE'],
//       },
//     });

//     // Log in & visit the subscription center:
//     cy.login(user).visit('/us/account/subscriptions');

//     // We should see the user's name and the correct subscription topics checked
//     cy.contains('Welcome, Delilah!');
//     cy.findByTestId('community-newsletter-subscription').should(
//       'contain',
//       'Unsubscribe',
//     );
//     cy.findByTestId('news-newsletter-subscription').should(
//       'contain',
//       'Unsubscribe',
//     );
//     cy.findByTestId('lifestyle-newsletter-subscription').should(
//       'contain',
//       'Unsubscribe',
//     );
//     cy.findByTestId('scholarships-newsletter-subscription').should(
//       'contain',
//       'Subscribe',
//     );
//   });
// });

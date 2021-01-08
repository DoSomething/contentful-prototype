import { userFactory } from '../fixtures/user';

describe('User Profile Page', () => {
  beforeEach(() => cy.configureMocks());
  /** @test */
  it('Renders User Account Page if that User is Logged In', () => {
    const user = userFactory();
    cy.mockGraphqlOp('AccountQuery', {
      user: {
        lastName: 'Tester',
        birthdate: Date(),
        email: 'tester@mail.com',
        emailSubscriptionTopics: ['COMMUNITY'],
      },
    });
    cy.login(user);
    cy.visit(`/us/account`);
    // cy.findByTestId('unregistered-status').should('have.length', 1);
    // cy.findByTestId('quiz-result-page').should('have.length', 0);
  });
});

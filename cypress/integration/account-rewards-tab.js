import { userFactory } from '../fixtures/user';

describe('User Profile Page', () => {
  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the users current earned badges', () => {
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
    cy.visit(`/us/account/badges`);
    cy.findByTestId('user-email').should('have.length', 0);
  });
});

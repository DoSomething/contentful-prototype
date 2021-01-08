import { userFactory } from '../fixtures/user';

describe('User Profile Page', () => {
  beforeEach(() => cy.configureMocks());
  /** @test */
  it('Renders user Account Page if that user is logged in', () => {
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
    cy.findByTestId('user-email').should('contain', 'tester@mail.com');
  });

  /** @test */
  it('Does not render user Account Page if not logged in', () => {
    cy.visit(`/us/account`);
    cy.findByTestId('user-email').should('have.length', 0);
  });
});

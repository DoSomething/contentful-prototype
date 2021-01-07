import { userFactory } from '../fixtures/user';

describe('User Profile Page', () => {
  beforeEach(() => cy.configureMocks());
  /** @test */
  it('Renders Voter Registration Call to Action in Registration Status', () => {
    const user = userFactory();
    cy.mockGraphqlOp('UserVoterRegistrationStatusQuery', {
      user: {
        voterRegistrationStatus: 'UNREGISTERED',
      },
    });
    cy.login(user);
    cy.visit(`/us/account`);
    // cy.findByTestId('unregistered-status').should('have.length', 1);
    // cy.findByTestId('quiz-result-page').should('have.length', 0);
  });
});

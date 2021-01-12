import { userFactory } from '../fixtures/user';

describe('User Account Profile Tab', () => {
  beforeEach(() => cy.configureMocks());
  /** @test */
  it('Renders user Profile Tab if that user is logged in', () => {
    const user = userFactory();
    cy.mockGraphqlOp('AccountQuery', {
      user: {
        firstName: user.firstName,
        lastName: 'Tester',
        email: 'tester@mail.com',
        birthdate: '10/12/1994',
      },
    });
    cy.login(user);
    cy.visit(`/us/account`);
    cy.findByTestId('user-email').should('contain', 'tester@mail.com');
    cy.findByTestId('user-name').should('contain', `${user.firstName} Tester`);
    cy.findByTestId('user-birthdate').should('contain', '10/12/1994');
  });

  /** @test */
  it('Does not render user Profile Tab if not logged in', () => {
    cy.visit(`/us/account`);
    cy.findByTestId('user-email').should('have.length', 0);
  });

  /** @test */
  it('Shows the user as unregistered based on their voter registration status', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserVoterRegistrationStatusQuery', {
      user: {
        id: user.id,
        voterRegistrationStatus: 'UNREGISTERED',
      },
    });

    cy.login(user);
    cy.visit(`/us/account`);
    cy.findByTestId('unregistered-voting-status').should('have.length', 1);
  });

  /** @test */
  it('Shows the user as registered based on their voter registration status', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserVoterRegistrationStatusQuery', {
      user: {
        id: user.id,
        voterRegistrationStatus: 'REGISTRATION_COMPLETE',
      },
    });

    cy.login(user);
    cy.visit(`/us/account`);
    cy.findByTestId('complete-registration-status').should('have.length', 1);
  });

  /** @test */
  it('Shows the user as uncertain based on their voter registration status', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserVoterRegistrationStatusQuery', {
      user: {
        id: user.id,
        voterRegistrationStatus: 'UNCERTAIN',
      },
    });

    cy.login(user);
    cy.visit(`/us/account`);
    cy.findByTestId('uncertain-registration-status').should('have.length', 1);
  });
});

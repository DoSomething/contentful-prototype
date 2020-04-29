/// <reference types="Cypress" />

import { userFactory } from '../../fixtures/user';
import exampleVoterRegistrationDriveCampaign from '../../fixtures/contentful/exampleVoterRegistrationDriveCampaign';

describe('Alpha Voter Registration Drive Page', () => {
  beforeEach(() => cy.configureMocks());

  it('Visit Alpha OVRD page with 2 referrals', () => {
    const user = userFactory();

    cy.authVisitCampaignWithSignup(user, exampleVoterRegistrationDriveCampaign);

    cy.get('#alpha-voter-registration-drive-page').should('have.length', 1);
  });
});

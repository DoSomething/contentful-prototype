/// <reference types="Cypress" />

import { userFactory } from '../fixtures/user';

const voterRegistrationDriveBlockUrl = '/us/blocks/2T5ARr1AViKw2Kw0Q4S0so';

describe('Voter Registration Drive', () => {
  beforeEach(() => cy.configureMocks());

  it('Renders count of voter registration referrals', () => {
    const user = userFactory();

    cy.mockGraphqlOp('ContentfulBlockQuery', {
      block: {
        id: '2T5ARr1AViKw2Kw0Q4S0so',
        __typename: 'SocialDriveBlock',
        link: 'https://vote.dosomething.org',
        hidePageViews: false,
      },
    });

    cy.login(user).visit(voterRegistrationDriveBlockUrl);

    cy.contains('.page-views__text', 'Total page views');
  });
});

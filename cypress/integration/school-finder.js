/// <reference types="Cypress" />
import { cloneDeep } from 'lodash';
import { userFactory } from '../fixtures/user';
import { exampleCampaign } from '../fixtures/contentful';

const teensForJeansCampaign = cloneDeep(exampleCampaign);
teensForJeansCampaign.campaign.campaignId = '9001';

const exampleSchool = {
  id: '3401458',
  name: 'Puppet Sloth Elementary',
  city: 'Hollywood',
  state: 'CA',
};

describe('School Finder', () => {
  beforeEach(() => cy.configureMocks());

  it('Visit TFJ campaign and display Find Your School if user school is not set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        id: user.id,
        schoolId: null,
        school: null,
      },
    });

    cy.visitCampaignWithSignup(user, teensForJeansCampaign);

    cy.get('.school-finder h1').should('contain', 'Find Your School');
  });

  it('Visit TFJ campaign and display Your School school if user school set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        id: user.id,
        schoolId: exampleSchool.id,
        school: exampleSchool,
      },
    });

    cy.visitCampaignWithSignup(user, teensForJeansCampaign);

    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder h3').should('contain', exampleSchool.name);
  });

  it('Visit non-TFJ campaign and verify School Finder does not exist', () => {
    const user = userFactory();

    cy.visitCampaignWithSignup(user, exampleCampaign);

    cy.get('.school-finder').should('not.exist');
  });
});

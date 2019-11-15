/// <reference types="Cypress" />
import { cloneDeep } from 'lodash';
import { userFactory } from '../fixtures/user';
import {
  exampleCampaign,
  exampleSchoolFinderCampaign,
} from '../fixtures/contentful';

const exampleSchool = {
  id: '3401458',
  name: 'Puppet Sloth Elementary',
  city: 'Hollywood',
  state: 'CA',
};

describe('School Finder', () => {
  beforeEach(() => cy.configureMocks());

  it('Visit School Finder campaign and display Find Your School if user school is not set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: null,
        school: null,
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleSchoolFinderCampaign);

    cy.get('.school-finder h1').should('contain', 'Find Your School');
  });

  it('Visit School Finder campaign and display Your School if user school set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: exampleSchool.id,
        school: exampleSchool,
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleSchoolFinderCampaign);

    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder h3').should('contain', exampleSchool.name);
  });

  it('Visit non School Finder campaign and verify School Finder does not display', () => {
    const user = userFactory();

    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.get('.school-finder').should('not.exist');
  });
});

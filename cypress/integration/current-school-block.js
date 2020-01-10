/// <reference types="Cypress" />
import { cloneDeep } from 'lodash';
import { userFactory } from '../fixtures/user';
import exampleCampaign from '../fixtures/contentful/exampleCampaign';
import exampleCurrentSchoolBlockWithAction from '../fixtures/contentful/exampleCurrentSchoolBlockWithAction';
import exampleCurrentSchoolBlockWithoutAction from '../fixtures/contentful/exampleCurrentSchoolBlockWithoutAction';
import { SCHOOL_NOT_AVAILABLE_SCHOOL_ID } from '../../resources/assets/constants/school-finder';

const exampleSchool = {
  id: '3401458',
  name: 'Puppet Sloth Elementary',
  city: 'Hollywood',
  state: 'CA',
  schoolActionStats: [],
};
const exampleAction = {
  id: 21,
  noun: 'puppets',
  verb: 'forgotten',
  schoolActionStats: [
    {
      id: 4,
      acceptedQuantity: 711,
    },
  ],
};

const schoolFinderConfig =
  exampleCurrentSchoolBlockWithAction.campaign.pages[0].fields.blocks[0].fields;

describe('School Finder', () => {
  beforeEach(() => cy.configureMocks());

  it('Current School Block displays school finder form when user school is not set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: null,
        school: null,
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleCurrentSchoolBlockWithAction);

    cy.get('.current-school').should('have.length', 0);
    cy.get('.school-finder-form').should('have.length', 1);
    cy.get('.school-finder h1').should('contain', 'Find Your School');
    cy.get('.school-finder').should(
      'contain',
      schoolFinderConfig.selectSchoolDescription,
    );
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.schoolNotAvailableDescription,
    );
  });

  it('Current School Block displays user school when school is set, and school impact when Action is set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: exampleSchool.id,
        school: exampleSchool,
      },
    });
    cy.mockGraphqlOp('SchoolActionQuery', {
      action: exampleAction,
    });

    cy.authVisitCampaignWithSignup(user, exampleCurrentSchoolBlockWithAction);

    cy.get('.current-school').should('have.length', 1);
    cy.get('.school-finder-form').should('have.length', 0);
    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder .school-name').should('contain', exampleSchool.name);
    cy.get('.school-finder .quantity-value').should(
      'contain',
      exampleAction.schoolActionStats[0].acceptedQuantity,
    );
    cy.get('.school-finder .quantity-label').should(
      'contain',
      `${exampleAction.noun} ${exampleAction.verb}`,
    );
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.selectSchoolDescription,
    );
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.schoolNotAvailableDescription,
    );
  });

  it('Current School Block displays user school and 0 for school impact if no action stats', () => {
    const user = userFactory();
    const exampleActionWithoutStats = cloneDeep(exampleAction);
    exampleActionWithoutStats.schoolActionStats = [];

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: exampleSchool.id,
        school: exampleSchool,
      },
    });
    cy.mockGraphqlOp('SchoolActionQuery', {
      action: exampleActionWithoutStats,
    });

    cy.authVisitCampaignWithSignup(user, exampleCurrentSchoolBlockWithAction);

    cy.get('.current-school').should('have.length', 1);
    cy.get('.school-finder .school-name').should('contain', exampleSchool.name);
    cy.get('.school-finder .quantity-value').should('contain', 0);
    cy.get('.school-finder .quantity-label').should(
      'contain',
      `${exampleAction.noun} ${exampleAction.verb}`,
    );
  });

  it('Current School Block displays not available description if user school not available', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: SCHOOL_NOT_AVAILABLE_SCHOOL_ID,
        school: {
          id: SCHOOL_NOT_AVAILABLE_SCHOOL_ID,
          name: null,
          city: null,
          state: null,
        },
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleCurrentSchoolBlockWithAction);

    cy.get('.current-school').should('have.length', 1);
    cy.get('.school-finder-form').should('have.length', 0);
    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.selectSchoolDescription,
    );
    cy.get('.school-finder').should(
      'contain',
      schoolFinderConfig.schoolNotAvailableDescription,
    );
  });

  it('Current School Block displays not available description if user school not available', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: SCHOOL_NOT_AVAILABLE_SCHOOL_ID,
        school: {
          id: SCHOOL_NOT_AVAILABLE_SCHOOL_ID,
          name: null,
          city: null,
          state: null,
        },
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleCurrentSchoolBlockWithAction);

    cy.get('.current-school').should('have.length', 1);
    cy.get('.school-finder-form').should('have.length', 0);
    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.selectSchoolDescription,
    );
    cy.get('.school-finder').should(
      'contain',
      schoolFinderConfig.schoolNotAvailableDescription,
    );
  });

  it('Current School Block does not display school impact when Action is not set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: exampleSchool.id,
        school: exampleSchool,
      },
    });
    cy.mockGraphqlOp('SchoolActionQuery', {
      action: exampleAction,
    });

    cy.authVisitCampaignWithSignup(
      user,
      exampleCurrentSchoolBlockWithoutAction,
    );

    cy.get('.current-school').should('have.length', 1);
    cy.get('.school-finder-form').should('have.length', 0);
    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder .school-name').should('contain', exampleSchool.name);
    cy.get('.school-finder .quantity-value').should('have.length', 0);
    cy.get('.school-finder .quantity-label').should('have.length', 0);
  });
});

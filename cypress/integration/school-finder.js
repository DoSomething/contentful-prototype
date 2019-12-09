/// <reference types="Cypress" />
import { cloneDeep } from 'lodash';
import { userFactory } from '../fixtures/user';
import { SCHOOL_NOT_AVAILABLE_SCHOOL_ID } from '../../resources/assets/constants/school-finder';
import {
  exampleCampaign,
  exampleSchoolFinderCampaign,
} from '../fixtures/contentful';

const exampleSchool = {
  id: '3401458',
  name: 'Puppet Sloth Elementary',
  city: 'Hollywood',
  state: 'CA',
  schoolActionStats: [],
};

const schoolFinderConfig =
  exampleSchoolFinderCampaign.campaign.pages[0].fields.blocks[0].fields
    .additionalContent;

describe('School Finder', () => {
  beforeEach(() => cy.configureMocks());

  it('Visit School Finder campaign and display form if user school is not set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: null,
        school: null,
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleSchoolFinderCampaign);

    cy.get('.current-school').should('have.length', 0);
    cy.get('.school-finder-form').should('have.length', 1);
    cy.get('.school-finder h1').should('contain', 'Find Your School');
    cy.get('.school-finder').should(
      'contain',
      schoolFinderConfig.schoolFinderFormDescription,
    );
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.schoolNotAvailableDescription,
    );
  });

  it('Visit School Finder campaign and display user school info if set', () => {
    const user = userFactory();

    cy.mockGraphqlOp('UserSchoolQuery', {
      user: {
        schoolId: exampleSchool.id,
        school: exampleSchool,
      },
    });

    cy.authVisitCampaignWithSignup(user, exampleSchoolFinderCampaign);

    cy.get('.current-school').should('have.length', 1);
    cy.get('.school-finder-form').should('have.length', 0);
    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder h3').should('contain', exampleSchool.name);
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.schoolFinderFormDescription,
    );
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.schoolNotAvailableDescription,
    );
  });

  it('Visit School Finder campaign and display not available info if not available', () => {
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

    cy.authVisitCampaignWithSignup(user, exampleSchoolFinderCampaign);

    cy.get('.current-school').should('have.length', 1);
    cy.get('.school-finder-form').should('have.length', 0);
    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder').should(
      'not.contain',
      schoolFinderConfig.schoolFinderFormDescription,
    );
    cy.get('.school-finder').should(
      'contain',
      schoolFinderConfig.schoolNotAvailableDescription,
    );
  });

  it('Visit non School Finder campaign and verify School Finder does not display', () => {
    const user = userFactory();

    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.get('.school-finder').should('not.exist');
  });
});

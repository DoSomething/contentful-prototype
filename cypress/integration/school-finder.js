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
  // Configure a new "mock" server before each test:
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

    // Log in & visit the campaign action page:
    cy.login(user)
      .withState(teensForJeansCampaign)
      .withSignup(teensForJeansCampaign.campaign.campaignId)
      .visit(`/us/campaigns/${teensForJeansCampaign.campaign.slug}`);

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

    // Log in & visit the campaign action page:
    cy.login(user)
      .withState(teensForJeansCampaign)
      .withSignup(teensForJeansCampaign.campaign.campaignId)
      .visit(`/us/campaigns/${teensForJeansCampaign.campaign.slug}`);

    cy.get('.school-finder h1').should('not.contain', 'Find Your School');
    cy.get('.school-finder h1').should('contain', 'Your School');
    cy.get('.school-finder h3').should('contain', exampleSchool.name);
  });

  it('Visit non TFJ campaign and verify School Finder does not exist', () => {
    const user = userFactory();

    // Log in & visit the campaign action page:
    cy.login(user)
      .withState(exampleCampaign)
      .withSignup(exampleCampaign.campaign.campaignId)
      .visit(`/us/campaigns/${exampleCampaign.campaign.slug}`);

    cy.get('.school-finder').should('not.exist');
  });
});

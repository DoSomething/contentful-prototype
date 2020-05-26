/// <reference types="Cypress" />
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

describe('Campaign Info Block', () => {
  const scholarshipAndReportbackAction = {
    actionLabel: 'Sign a Petition',
    timeCommitmentLabel: '30 minutes - 1 hour',
    scholarshipEntry: true,
    reportback: true,
  };

  const reportbackActionOne = {
    actionLabel: 'Share Something',
    timeCommitmentLabel: '1 hour',
    scholarshipEntry: false,
    reportback: true,
  };

  const reportbackActionTwo = {
    actionLabel: 'Sign a Petition',
    timeCommitmentLabel: '15 minutes - 1 hour',
    scholarshipEntry: false,
    reportback: true,
  };

  const plainAction = {
    actionLabel: 'Call Tej',
    timeCommitmentLabel: '5 minutes - 6 hours',
    scholarshipEntry: false,
    reportback: false,
  };

  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the reportback & scholarship action data', () => {
    cy.mockGraphqlOp('CampaignInfoQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [
          scholarshipAndReportbackAction,
          reportbackActionOne,
          reportbackActionTwo,
          plainAction,
        ],
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-info-block-container').within(() => {
      cy.contains('Sign a Petition');
      cy.contains('30 minutes - 1 hour');
    });
  });

  /** @test */
  it('defaults to the first reportback action if there is no scholarship', () => {
    cy.mockGraphqlOp('CampaignInfoQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [reportbackActionOne, reportbackActionTwo, plainAction],
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-info-block-container').within(() => {
      cy.contains('Share Something');
      cy.contains('1 hour');
    });
  });

  /** @test */
  it('Displays a Scholarship Amount if there is one for the campaign', () => {
    cy.mockGraphqlOp('CampaignInfoQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [scholarshipAndReportbackAction],
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-info-block-container').within(() => {
      cy.contains('$5,000');
      cy.contains('Win A Scholarship');
    });
  });

  describe('Displays the Volunteer Credit value', () => {
    /** @test */
    it('Displays Yes when the action earns volunteer credit', () => {
      cy.mockGraphqlOp('CampaignInfoQuery', {
        campaign: (root, { campaignId }) => ({
          id: campaignId,
          actions: () => [
            {
              ...scholarshipAndReportbackAction,
              volunteerCredit: true,
            },
          ],
        }),
      });

      cy.withFeatureFlags({ volunteer_credits: true }).anonVisitCampaign(
        exampleCampaign,
      );

      cy.findByTestId('campaign-info-block-container').within(() => {
        cy.contains('Volunteer Credit');

        cy.findByTestId('volunteer-credit-value').contains('Yes');
      });
    });

    /** @test */
    it('Displays No when the action does not earn volunteer credit', () => {
      cy.mockGraphqlOp('CampaignInfoQuery', {
        campaign: (root, { campaignId }) => ({
          id: campaignId,
          actions: () => [
            {
              ...scholarshipAndReportbackAction,
              volunteerCredit: false,
            },
          ],
        }),
      });

      cy.withFeatureFlags({ volunteer_credits: true }).anonVisitCampaign(
        exampleCampaign,
      );

      cy.findByTestId('campaign-info-block-container').within(() => {
        cy.contains('Volunteer Credit');

        cy.findByTestId('volunteer-credit-value').contains('No');
      });
    });
  });

  /** @test */
  it('Opens the scholarship modal when "View Scholarship Details" is clicked, and closes it when the X button is clicked.', () => {
    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-info-block-container').within(() => {
      cy.contains('button', 'View Scholarship Details').click();
    });

    cy.findByTestId('campaign-info-block-scholarship-details').should(
      'have.length',
      1,
    );

    cy.get('.modal-portal > .wrapper.modal-container').click('topRight');

    cy.findByTestId('campaign-info-block-scholarship-details').should(
      'have.length',
      0,
    );
  });
});

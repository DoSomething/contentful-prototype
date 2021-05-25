/// <reference types="Cypress" />
import exampleCampaign from '../fixtures/contentful/exampleCampaign';

describe('Campaign Progress Bar', () => {
  const scholarshipAndReportbackAction = {
    actionLabel: 'Sign a Petition',
    postType: 'photo',
    timeCommitmentLabel: '30 minutes - 1 hour',
    noun: 'petitions',
    verb: 'signed',
    scholarshipEntry: true,
    reportback: true,
    currentImpactQuantity: 1200,
  };

  const noCurrentTotalImpactAction = {
    actionLabel: 'Sign a Petition',
    postType: 'photo',
    timeCommitmentLabel: '30 minutes - 1 hour',
    noun: 'petitions',
    verb: 'signed',
    scholarshipEntry: true,
    reportback: true,
    currentImpactQuantity: 0,
  };

  const textPostTypeAction = {
    actionLabel: 'Sign a Petition',
    postType: 'text',
    timeCommitmentLabel: '30 minutes - 1 hour',
    noun: 'petitions',
    verb: 'signed',
    scholarshipEntry: true,
    reportback: true,
    currentImpactQuantity: 1200,
  };

  beforeEach(() => cy.configureMocks());

  /** @test */
  it('Displays the progress bar with correct data from action', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [scholarshipAndReportbackAction],
      }),
    });
    cy.mockGraphqlOp('CampaignProgressBarQuery', {
      action: (root, { actionId }) => ({
        ...scholarshipAndReportbackAction,
        id: actionId,
        impactGoal: 3000,
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-progress-bar-container').within(() => {
      cy.contains('1,200 petitions signed.');
      cy.contains('Help us get to 3,000!');
    });
  });

  /** @test */
  it('Displays the progress bar with default goal if there is no impact goal', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [scholarshipAndReportbackAction],
      }),
    });
    cy.mockGraphqlOp('CampaignProgressBarQuery', {
      action: (root, { actionId }) => ({
        ...scholarshipAndReportbackAction,
        id: actionId,
        impactGoal: 0,
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-progress-bar-container').within(() => {
      cy.contains('1,200 petitions signed.');
      cy.contains(`Help us get to 2,000!`);
    });
  });

  /** @test */
  it('Displays the progress bar with default goal if there current quantity exceeds goal', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [scholarshipAndReportbackAction],
      }),
    });
    cy.mockGraphqlOp('CampaignProgressBarQuery', {
      action: (root, { actionId }) => ({
        ...scholarshipAndReportbackAction,
        id: actionId,
        impactGoal: 500,
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-progress-bar-container').within(() => {
      cy.contains('1,200 petitions signed.');
      cy.contains(`Help us get to 2,000!`);
    });
  });

  /** @test */
  it('Does not display if progress quantity is 0 or null', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [noCurrentTotalImpactAction],
      }),
    });
    cy.mockGraphqlOp('CampaignProgressBarQuery', {
      action: (root, { actionId }) => ({
        ...noCurrentTotalImpactAction,
        id: actionId,
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-progress-bar-container').should('have.length', 0);
  });

  /** @test */
  it('Does not display the progress bar for a text action', () => {
    cy.mockGraphqlOp('CampaignBannerQuery', {
      campaign: (root, { campaignId }) => ({
        id: campaignId,
        actions: () => [textPostTypeAction],
      }),
    });
    cy.mockGraphqlOp('CampaignProgressBarQuery', {
      action: (root, { actionId }) => ({
        ...textPostTypeAction,
        id: actionId,
        impactGoal: 3000,
      }),
    });

    cy.anonVisitCampaign(exampleCampaign);

    cy.findByTestId('campaign-progress-bar-container').should('have.length', 0);
  });
});

/// <reference types="Cypress" />
import exampleCampaign from '../fixtures/contentful/exampleCampaign';
// import { userFactory } from '../fixtures/user';

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
      cy.contains(
        `${scholarshipAndReportbackAction.currentImpactQuantity.toLocaleString()} ${
          scholarshipAndReportbackAction.noun
        } ${scholarshipAndReportbackAction.verb}.`,
      );
      cy.contains(`Help us get to 3,000!`);
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
      cy.contains(
        `${scholarshipAndReportbackAction.currentImpactQuantity.toLocaleString()} ${
          scholarshipAndReportbackAction.noun
        } ${scholarshipAndReportbackAction.verb}.`,
      );
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
      cy.contains(
        `${scholarshipAndReportbackAction.currentImpactQuantity.toLocaleString()} ${
          scholarshipAndReportbackAction.noun
        } ${scholarshipAndReportbackAction.verb}.`,
      );
      cy.contains(`Help us get to 2,000!`);
    });
  });
});

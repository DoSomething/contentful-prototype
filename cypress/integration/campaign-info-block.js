/// <reference types="Cypress" />
import exampleCampaign from '../fixtures/contentful/exampleCampaign';
import { userFactory } from '../fixtures/user';

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

  describe('Displays the Volunteer Credit value and proper tooltip content', () => {
    context('when the action qualifies for volunteer credit', () => {
      /** @test */
      it('Displays Yes and surfaces the correct tooltip info', () => {
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

        cy.anonVisitCampaign(exampleCampaign);

        cy.findByTestId('volunteer-credit-column').contains('Volunteer Credit');
        cy.findByTestId('volunteer-credit-value').contains('Yes');

        cy.findByTestId('time-commitment-value').within(() => {
          cy.findByTestId('tooltip-target').click();
        });

        cy.findByTestId('tooltip-content').contains(
          'This is the estimated time it takes to complete this action. For volunteer credit certificates, the time you enter will show up on your certificate',
        );

        cy.findByTestId('volunteer-credit-value').within(() => {
          cy.findByTestId('tooltip-target').click();
        });

        cy.findByTestId('tooltip-content').contains(
          "When you complete this campaign you'll be able to download a certificate verifying your participation.",
        );
      });
    });

    context('When the action does not qualify for volunteer credit', () => {
      /** @test */
      it('Displays No and surfaces the correct tooltip content', () => {
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

        cy.anonVisitCampaign(exampleCampaign);

        cy.findByTestId('volunteer-credit-column').contains('Volunteer Credit');
        cy.findByTestId('volunteer-credit-value').contains('No');

        cy.findByTestId('time-commitment-value').within(() => {
          cy.findByTestId('tooltip-target').click();
        });

        cy.findByTestId('tooltip-content').contains(
          'This is the estimated time it takes to complete this action.',
        );
        cy.findByTestId('tooltip-content').should(
          'not.contain',
          'For volunteer credit certificates, the time you enter will show up on your certificate',
        );

        cy.findByTestId('volunteer-credit-value').within(() => {
          cy.findByTestId('tooltip-target').click();
        });

        cy.findByTestId('tooltip-content').contains(
          'This campaign is not eligible for a certificate of proof for volunteer hours.',
        );
      });
    });
  });

  /** @test */
  it('Visit campaign, as an affiliated user, show scholarship modal without "Apply Now" ', () => {
    const user = userFactory();

    // Auth user visit a campaign page:
    cy.authVisitCampaignWithSignup(user, exampleCampaign);

    cy.findByTestId('campaign-info-block-container').within(() => {
      cy.contains('button', 'View Scholarship Details').click();
    });

    cy.findByTestId('campaign-banner-affiliated').should('not.exist');
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

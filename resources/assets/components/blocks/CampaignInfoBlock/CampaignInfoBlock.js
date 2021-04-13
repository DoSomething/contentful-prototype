import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';
import { getHumanFriendlyDate } from '../../../helpers/datetime';
import TooltipQuestionMark from '../../utilities/Tooltip/TooltipQuestionMark';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './campaign-info-block.scss';

/**
 * The GraphQL query to load data for this component.
 */
const CAMPAIGN_INFO_QUERY = gql`
  query CampaignInfoQuery($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      endDate
      isOpen
      actions {
        id
        actionLabel
        timeCommitmentLabel
        scholarshipEntry
        reportback
        volunteerCredit
      }
    }
  }
`;

const CampaignInfoBlock = ({
  campaignId,
  hideScholarshipDetails,
  scholarshipAmount,
  scholarshipDeadline,
  showModal,
  actionIdToDisplay,
}) => (
  <Card
    attributes={{ 'data-testid': 'campaign-info-block-container' }}
    className="bordered p-3 rounded campaign-info"
  >
    <Query query={CAMPAIGN_INFO_QUERY} variables={{ campaignId }}>
      {res => {
        const endDate = res.campaign.endDate;
        const actions = res.campaign.actions || [];
        const isOpen = res.campaign.isOpen;

        const handleViewMoreLinkSelect = () => {
          showModal();
          trackAnalyticsEvent('clicked_view_more_link_scholarships', {
            action: 'link_clicked',
            category: EVENT_CATEGORIES.modal,
            label: 'SCHOLARSHIP_MODAL',
            context: { campaignId },
          });
        };

        // Decide which action to display
        let actionItem;

        if (actionIdToDisplay) {
          actionItem = actions.find(action => action.id === actionIdToDisplay);
        } else {
          actionItem = actions.find(
            action => action.reportback && action.scholarshipEntry,
          );
        }
        if (!actionItem) {
          actionItem = actions.find(action => action.reportback);
        }

        // Decide if we want to display scholarship information
        let showScholarshipInfo = false;

        if (scholarshipAmount && scholarshipDeadline && isOpen) {
          showScholarshipInfo = true;
        }

        return (
          <>
            {!showScholarshipInfo ? (
              <h1 className="mb-3 text-lg uppercase">Campaign Info</h1>
            ) : null}
            <dl className="clearfix">
              {showScholarshipInfo ? (
                <>
                  <dt className="campaign-info__scholarship">
                    Win A Scholarship
                  </dt>
                  <dd className="campaign-info__scholarship">
                    {`$${scholarshipAmount.toLocaleString()}`}
                  </dd>

                  <dt>Next Deadline</dt>
                  <dd>{getHumanFriendlyDate(scholarshipDeadline)}</dd>
                  {!hideScholarshipDetails ? (
                    <div>
                      <button
                        data-testid="campaign-info-block-scholarship-details-link"
                        className="text-blue-500 pb-4"
                        type="button"
                        onClick={handleViewMoreLinkSelect}
                      >
                        View Scholarship Details
                      </button>
                    </div>
                  ) : null}
                  <hr className="clear-both pb-3 border-gray-300" />
                </>
              ) : null}

              {endDate && !showScholarshipInfo ? (
                <>
                  <dt>Deadline</dt>
                  <dd>{getHumanFriendlyDate(endDate)}</dd>
                </>
              ) : null}
              {actionItem && actionItem.timeCommitmentLabel ? (
                <>
                  <dt>Time</dt>
                  <dd data-testid="time-commitment-value">
                    <div className="flex">
                      {actionItem.timeCommitmentLabel}

                      <TooltipQuestionMark
                        tooltipContent={`This is the estimated time it takes to complete this action${
                          actionItem.volunteerCredit
                            ? '. For volunteer credit certificates, the time you enter will show up on your certificate'
                            : ''
                        }.`}
                      />
                    </div>
                  </dd>
                </>
              ) : null}
              {actionItem && actionItem.actionLabel ? (
                <>
                  <dt>Action Type</dt>
                  <dd>{actionItem.actionLabel}</dd>
                </>
              ) : null}
              {actionItem ? (
                <>
                  <dt data-testid="volunteer-credit-column">
                    Volunteer Credit
                  </dt>
                  <dd data-testid="volunteer-credit-value">
                    <div className="flex">
                      {actionItem.volunteerCredit ? 'Yes' : 'No'}

                      <TooltipQuestionMark
                        tooltipContent={
                          actionItem.volunteerCredit ? (
                            <>
                              When you complete this campaign you&apos;ll be
                              able to download a certificate verifying your
                              participation.{' '}
                              <a
                                href="/us/about/volunteer-hours"
                                target="_blank"
                              >
                                Learn more
                              </a>
                              .
                            </>
                          ) : (
                            <>
                              This campaign is not eligible for a certificate of
                              proof for volunteer hours.{' '}
                              <a
                                href="/us/about/volunteer-hours"
                                target="_blank"
                              >
                                We have plenty of campaigns that are
                              </a>
                              !!
                            </>
                          )
                        }
                      />
                    </div>
                  </dd>
                </>
              ) : null}
            </dl>
          </>
        );
      }}
    </Query>
  </Card>
);

CampaignInfoBlock.propTypes = {
  actionIdToDisplay: PropTypes.number,
  campaignId: PropTypes.number.isRequired,
  hideScholarshipDetails: PropTypes.bool,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  showModal: PropTypes.func,
};

CampaignInfoBlock.defaultProps = {
  actionIdToDisplay: null,
  hideScholarshipDetails: false,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showModal: null,
};

export default CampaignInfoBlock;

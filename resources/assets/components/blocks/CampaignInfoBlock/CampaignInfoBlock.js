import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';
import Tooltip from '../../utilities/Tooltip';
import { getHumanFriendlyDate } from '../../../helpers';
import TooltipQuestionMark from './TooltipQuestionMark.svg';
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

const CampaignInfoBlockTooltip = ({ tooltipContent }) => (
  <Tooltip tooltipContent={tooltipContent}>
    <div
      className="pl-1"
      css={css`
        width: 20px;
      `}
    >
      <img alt="Question mark" src={TooltipQuestionMark} />
    </div>
  </Tooltip>
);

CampaignInfoBlockTooltip.propTypes = {
  tooltipContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};

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
                  <dd>
                    <div className="flex">
                      {actionItem.timeCommitmentLabel}
                      {actionItem.volunteerCredit ? (
                        <CampaignInfoBlockTooltip tooltipContent="This is the estimate time it takes to complete this action. For volunteer credit certificates, the time you enter will show up on your certificate." />
                      ) : null}
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
                  <dt>Volunteer Credit</dt>
                  <dd data-testid="volunteer-credit-value">
                    <div className="flex">
                      {actionItem.volunteerCredit ? 'Yes' : 'No'}
                      {actionItem.volunteerCredit ? (
                        <CampaignInfoBlockTooltip
                          tooltipContent={
                            <>
                              When you complete this campaign you&apos;ll be
                              able to download a certificate verifying your
                              participation. <a href="/">Learn more</a>
                            </>
                          }
                        />
                      ) : null}
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

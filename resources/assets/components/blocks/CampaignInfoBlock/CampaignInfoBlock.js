import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';
import { getHumanFriendlyDate } from '../../../helpers';
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
      }
    }
  }
`;

const CampaignInfoBlock = ({
  campaignId,
  scholarshipAmount,
  scholarshipDeadline,
  showModal,
  actionToDisplay,
}) => (
  <Card className="bordered p-3 rounded campaign-info">
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

        if (actionToDisplay) {
          actionItem = actions.find(action => action.id === actionToDisplay);
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
                <React.Fragment>
                  <dt className="campaign-info__scholarship">
                    Win A Scholarship
                  </dt>
                  <dd className="campaign-info__scholarship">
                    {`$${scholarshipAmount.toLocaleString()}`}
                  </dd>

                  <dt>Next Deadline</dt>
                  <dd>{getHumanFriendlyDate(scholarshipDeadline)}</dd>
                  <div>
                    <button
                      className="text-blue-500 pb-4"
                      type="button"
                      onClick={handleViewMoreLinkSelect}
                    >
                      View Scholarship Details
                    </button>
                  </div>
                  <hr className="clear-both pb-3 border-gray-300" />
                </React.Fragment>
              ) : null}

              {endDate && !showScholarshipInfo ? (
                <>
                  <dt>Deadline</dt>
                  <dd>{getHumanFriendlyDate(endDate)}</dd>
                </>
              ) : null}
              {actionItem && actionItem.timeCommitmentLabel ? (
                <React.Fragment>
                  <dt>Time</dt>
                  <dd>{actionItem.timeCommitmentLabel}</dd>
                </React.Fragment>
              ) : null}
              {actionItem && actionItem.actionLabel ? (
                <React.Fragment>
                  <dt>Action Type</dt>
                  <dd>{actionItem.actionLabel}</dd>
                </React.Fragment>
              ) : null}
            </dl>
          </>
        );
      }}
    </Query>
  </Card>
);

CampaignInfoBlock.propTypes = {
  actionToDisplay: PropTypes.number,
  campaignId: PropTypes.number.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  showModal: PropTypes.func,
};

CampaignInfoBlock.defaultProps = {
  actionToDisplay: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showModal: null,
};

export default CampaignInfoBlock;

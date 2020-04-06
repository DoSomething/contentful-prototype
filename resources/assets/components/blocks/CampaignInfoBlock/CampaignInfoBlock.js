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
}) => (
  <Card className="bordered p-3 rounded campaign-info">
    <Query query={CAMPAIGN_INFO_QUERY} variables={{ campaignId }}>
      {res => {
        const endDate = res.campaign.endDate;
        const actions = res.campaign.actions || [];
        const isOpen = res.campaign.isOpen;

        const handleViewMoreLinkSelect = () => {
          showModal();
          trackAnalyticsEvent('phoenix_clicked_view_more_link_scholarships', {
            action: 'link_clicked',
            category: EVENT_CATEGORIES.modal,
            label: 'SCHOLARSHIP_MODAL',
            context: { campaignId },
          });
        };

        let actionItem = actions.find(
          action => action.reportback && action.scholarshipEntry,
        );

        if (!actionItem) {
          actionItem = actions.find(action => action.reportback);
        }
        return (
          <>
            {!scholarshipAmount ? (
              <h1 className="mb-3 text-lg uppercase">Campaign Info</h1>
            ) : null}
            <dl className="clearfix">
              {scholarshipAmount && scholarshipDeadline && isOpen ? (
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

              {endDate && !scholarshipAmount ? (
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
  campaignId: PropTypes.number.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.number,
  showModal: PropTypes.func,
};

CampaignInfoBlock.defaultProps = {
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showModal: null,
};

export default CampaignInfoBlock;

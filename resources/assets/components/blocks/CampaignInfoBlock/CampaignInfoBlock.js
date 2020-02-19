import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';
import { getHumanFriendlyDate } from '../../../helpers';

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
}) => (
  <Card className="bordered p-3 rounded campaign-info">
    <Query query={CAMPAIGN_INFO_QUERY} variables={{ campaignId }}>
      {res => {
        const endDate = res.campaign.endDate;
        const actions = res.campaign.actions || [];
        const isOpen = res.campaign.isOpen;

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
              {scholarshipAmount && isOpen ? (
                <React.Fragment>
                  <dt className="campaign-info__scholarship">
                    Win A Scholarship
                  </dt>
                  <dd className="campaign-info__scholarship">
                    {`$${scholarshipAmount.toLocaleString()}`}
                  </dd>

                  <dt>Next Deadline</dt>
                  <dd>{getHumanFriendlyDate(scholarshipDeadline)}</dd>
                  <hr className="clear-both pb-3 border-gray-500" />
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
};

CampaignInfoBlock.defaultProps = {
  scholarshipAmount: null,
  scholarshipDeadline: null,
};

export default CampaignInfoBlock;

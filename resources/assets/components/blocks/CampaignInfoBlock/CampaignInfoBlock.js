import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';
import { getHumanFriendlyDate, isCampaignClosed } from '../../../helpers';

import './campaign-info-block.scss';

/**
 * The GraphQL query to load data for this component.
 */
const CAMPAIGN_INFO_QUERY = gql`
  query CampaignInfoQuery($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      endDate
      actions {
        actionLabel
        timeCommitmentLabel
        scholarshipEntry
        reportback
      }
    }
  }
`;

const CampaignInfoBlock = ({ campaignId, scholarshipAmount }) => (
  <Card className="bordered p-3 rounded campaign-info">
    <h1 className="mb-3 text-lg uppercase">Campaign Info</h1>

    <dl className="clearfix">
      <Query query={CAMPAIGN_INFO_QUERY} variables={{ campaignId }}>
        {res => {
          const endDate = res.campaign.endDate;
          const actions = res.campaign.actions || [];

          let actionItem = actions.find(
            action => action.reportback && action.scholarshipEntry,
          );

          if (!actionItem) {
            actionItem = actions.find(action => action.reportback);
          }

          return (
            <>
              {endDate ? (
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
              {scholarshipAmount && !isCampaignClosed(endDate) ? (
                <React.Fragment>
                  <dt className="campaign-info__scholarship">
                    Win A Scholarship
                  </dt>
                  <dd className="campaign-info__scholarship">
                    {`$${scholarshipAmount.toLocaleString()}`}
                  </dd>
                </React.Fragment>
              ) : null}
            </>
          );
        }}
      </Query>
    </dl>
  </Card>
);

CampaignInfoBlock.propTypes = {
  campaignId: PropTypes.number.isRequired,
  scholarshipAmount: PropTypes.number,
};

CampaignInfoBlock.defaultProps = {
  scholarshipAmount: null,
};

export default CampaignInfoBlock;

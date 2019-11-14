import React from 'react';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';

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
    <h3 className="mb-4 text-m uppercase">Campaign Info</h3>
    <dl className="clearfix">
      <Query query={CAMPAIGN_INFO_QUERY} variables={{ campaignId }}>
        {res => {
          const endDate = res.campaign.endDate;
          const actions = res.campaign.actions
            ? res.campaign.actions.filter(
                action => action.scholarshipEntry && action.reportback,
              )
            : [];
          const action = actions.length ? actions[0] : null;

          return (
            <>
              {endDate ? (
                <>
                  <dt>Deadline</dt>
                  <dd>
                    {format(String(endDate), 'MMMM do, yyyy', {
                      awareOfUnicodeTokens: true,
                    })}
                  </dd>
                </>
              ) : null}
              {action && action.timeCommitmentLabel ? (
                <React.Fragment>
                  <dt>Time</dt>
                  <dd>{action.timeCommitmentLabel}</dd>
                </React.Fragment>
              ) : null}
              {action && action.actionLabel ? (
                <React.Fragment>
                  <dt>Action Type</dt>
                  <dd>{action.actionLabel}</dd>
                </React.Fragment>
              ) : null}
              {scholarshipAmount ? (
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

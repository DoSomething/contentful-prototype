import React from 'react';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';

/**
 * The GraphQL query to load data for this component.
 */
const CAMPAIGN_INFO_QUERY = gql`
  query CampaignInfoQuery($campaignId: String!) {
    campaign(id: $campaignId) {
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

const CampaignInfo = ({ campaignId, scholarshipAmount }) => (
  <Card className="bordered padded rounded campaign-info">
    <h1 className="mb-4 text-m uppercase">Campaign Info</h1>
    <dl className="clearfix">
      {endDate ? (
        <React.Fragment>
          <dt>Deadline</dt>
          <dd>
            {format(endDate, 'MMMM do, yyyy', {
              awareOfUnicodeTokens: true,
            })}
          </dd>
        </React.Fragment>
      ) : null}
      {timeCommitment ? (
        <React.Fragment>
          <dt>Time</dt>
          <dd>{timeCommitment}</dd>
        </React.Fragment>
      ) : null}
      {actionType ? (
        <React.Fragment>
          <dt>Action Type</dt>
          <dd>{actionType}</dd>
        </React.Fragment>
      ) : null}
      {scholarshipAmount ? (
        <React.Fragment>
          <dt className="campaign-info__scholarship">Win A Scholarship</dt>
          <dd className="campaign-info__scholarship">
            {`$${scholarshipAmount}`}
          </dd>
        </React.Fragment>
      ) : null}
    </dl>
  </Card>
);

export default CampaignInfo;

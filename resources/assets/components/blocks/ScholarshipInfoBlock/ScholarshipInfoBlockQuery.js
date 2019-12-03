import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { env } from '../../../helpers';
import ScholarshipInfoBlock from './ScholarshipInfoBlock';
/**
 * The GraphQL query to load data for this component.
 */
const AFFILIATE_QUERY = gql`
  query AffiliateQuery(
    $utmLabel: String!
    $preview: Boolean!
    $campaignId: Int!
  ) {
    affiliate(utmLabel: $utmLabel, preview: $preview) {
      title
    }

    actions(campaignId: $campaignId) {
      actionLabel
      scholarshipEntry
      reportback
    }
  }
`;

/**
 * Fetch results via GraphQL using a query component.
 */
const ScholarshipInfoBlockQuery = props => (
  <Query
    query={AFFILIATE_QUERY}
    variables={{
      utmLabel: props.utmLabel,
      preview: env('CONTENTFUL_USE_PREVIEW_API'),
      campaignId: props.campaignId,
    }}
  >
    {res => {
      const title = res.affiliate.title;
      const actions = res.campaign.actions || [];

      const actionItem = actions.find(
        action => action.reportback && action.scholarshipEntry,
      );
      return (
        <ScholarshipInfoBlock
          affiliateTitle={title}
          actionType={get(actionItem, 'actionLabel', '')}
          {...props}
        />
      );
    }}
  </Query>
);

ScholarshipInfoBlockQuery.propTypes = {
  campaignId: PropTypes.number,
  utmLabel: PropTypes.string.isRequired,
};

ScholarshipInfoBlockQuery.defaultProps = {
  campaignId: null,
};

// Export the GraphQL query component.
export default ScholarshipInfoBlockQuery;

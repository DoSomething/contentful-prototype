import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { env } from '../../../helpers';
import ScholarshipModal from './ScholarshipModal';
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
      logo {
        description
        url(h: 100)
      }
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
const ScholarshipModalQuery = props => (
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
      const logo = res.affiliate.logo;
      const actions = get(res, 'actions', []).filter(
        action => action.scholarshipEntry && action.reportback,
      );
      const action = actions[0];
      return (
        <ScholarshipModal
          affiliateTitle={title}
          affiliateLogo={logo}
          actionType={get(action, 'actionLabel', '')}
          {...props}
        />
      );
    }}
  </Query>
);

ScholarshipModalQuery.propTypes = {
  campaignId: PropTypes.number,
  utmLabel: PropTypes.string.isRequired,
  isScholarshipBeta: PropTypes.bool,
};

ScholarshipModalQuery.defaultProps = {
  campaignId: null,
  isScholarshipBeta: false,
};

// Export the GraphQL query component.
export default ScholarshipModalQuery;

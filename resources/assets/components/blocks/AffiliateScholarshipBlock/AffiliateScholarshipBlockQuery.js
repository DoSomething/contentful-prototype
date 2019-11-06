import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { env } from '../../../helpers';
import AffiliateScholarshipBlock from './AffiliateScholarshipBlock';

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
const AffiliateScholarshipBlockQuery = props => (
  <Query
    query={AFFILIATE_QUERY}
    queryName="affiliateByUtmLabel"
    variables={{
      utmLabel: props.utmLabel,
      preview: env('CONTENTFUL_USE_PREVIEW_API'),
      campaignId: props.campaignId,
    }}
  >
    {res => {
      const title = res.affiliate.title;
      const logo = res.affiliate.logo;
      const actions = res.campaign.actions
        ? res.campaign.actions.filter(
            action => action.scholarshipEntry && action.reportback,
          )
        : [];
      const action = actions.length ? actions[0] : null;

      return (
        <AffiliateScholarshipBlock
          affiliateTitle={title}
          affiliateLogo={logo}
          {...props}
        />
      );
    }}
  </Query>
);

AffiliateScholarshipBlockQuery.propTypes = {
  utmLabel: PropTypes.string.isRequired,
};

// Export the GraphQL query component.
export default AffiliateScholarshipBlockQuery;

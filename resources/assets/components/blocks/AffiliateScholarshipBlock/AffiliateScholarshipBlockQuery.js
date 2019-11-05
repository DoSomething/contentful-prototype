import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { env } from '../../../helpers';
import AffiliateScholarshipBlock from './AffiliateScholarshipBlock';
import AffiliateScholarshipBlockBeta from './AffiliateScholarshipBlockBeta';

/**
 * The GraphQL query to load data for this component.
 */
const AFFILIATE_QUERY = gql`
  query AffiliateQuery($utmLabel: String!, $preview: Boolean!) {
    affiliate(utmLabel: $utmLabel, preview: $preview) {
      title
      logo {
        description
        url(h: 100)
      }
    }
  }
`;

/**
 * Fetch results via GraphQL using a query component.
 */
const AffiliateScholarshipBlockQuery = props => (
  <Query
    query={AFFILIATE_QUERY}
    variables={{
      utmLabel: props.utmLabel,
      preview: env('CONTENTFUL_USE_PREVIEW_API'),
    }}
  >
    {res => {
      const title = res.affiliate.title;
      const logo = res.affiliate.logo;

      return props.isScholarshipBeta ? (
        <AffiliateScholarshipBlockBeta
          affiliateTitle={title}
          affiliateLogo={logo}
          {...props}
        />
      ) : (
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
  isScholarshipBeta: PropTypes.bool,
};

AffiliateScholarshipBlockQuery.defaultProps = {
  isScholarshipBeta: false,
};

// Export the GraphQL query component.
export default AffiliateScholarshipBlockQuery;

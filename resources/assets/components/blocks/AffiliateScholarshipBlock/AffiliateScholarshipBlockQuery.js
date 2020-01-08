import React from 'react';
import get from 'lodash/get';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { env } from '../../../helpers';
import AffiliateScholarshipBlock from './AffiliateScholarshipBlock';

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
      preview: env('CONTENTFUL_USE_PREVIEW_API', false),
    }}
  >
    {res => {
      const title = get(res, 'affiliate.title');
      const logo = get(res, 'affiliate.logo');

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

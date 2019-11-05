import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

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
const AffiliateScholarshipBlockQuery = props => {
  const isScholarshipBeta = props.isScholarshipBeta;
  return (
    <Query
      query={AFFILIATE_QUERY}
      queryName="affiliateByUtmLabel"
      variables={{
        utmLabel: props.utmLabel,
        preview: env('CONTENTFUL_USE_PREVIEW_API'),
      }}
    >
      {({ loading, data }) => {
        if (loading) {
          return <div className="spinner -centered" />;
        }

        const title = get(data, 'affiliate.title');
        const logo = get(data, 'affiliate.logo');

        return (
          <>
            {isScholarshipBeta ? (
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
            )}
          </>
        );
      }}
    </Query>
  );
};

AffiliateScholarshipBlockQuery.propTypes = {
  utmLabel: PropTypes.string.isRequired,
  isScholarshipBeta: PropTypes.bool.isRequired,
};

// Export the GraphQL query component.
export default AffiliateScholarshipBlockQuery;

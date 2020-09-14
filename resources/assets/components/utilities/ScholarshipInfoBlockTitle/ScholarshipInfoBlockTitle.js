import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';

import { env, report } from '../../../helpers';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PlaceholderText from '../PlaceholderText/PlaceholderText';

/**
 * The GraphQL query to load data for this component.
 */
const SCHOLARSHIP_AFFILIATE_QUERY = gql`
  query ScholarshipAffiliateQuery($utmLabel: String!, $preview: Boolean!) {
    affiliate(utmLabel: $utmLabel, preview: $preview) {
      title
    }
  }
`;

const ScholarshipInfoBlockTitle = ({ campaignId, utmLabel }) => {
  const { loading, error, data } = useQuery(SCHOLARSHIP_AFFILIATE_QUERY, {
    skip: utmLabel === null,
    variables: {
      utmLabel,
      preview: env('CONTENTFUL_USE_PREVIEW_API'),
      campaignId,
    },
  });

  const isLoaded = !loading;
  const affiliateTitle = get(data, 'affiliate.title');

  if (error) {
    console.error(`[ErrorBlock] ${error}`);
    report(error);
    return <ErrorBlock error={error} />;
  }
  return (
    <>
      {isLoaded ? (
        <strong className="text-lg">
          Welcome
          {affiliateTitle
            ? ` from ${affiliateTitle.toUpperCase()}`
            : ' to DoSomething.org!'}
          !
        </strong>
      ) : (
        <PlaceholderText size="large" />
      )}
    </>
  );
};

ScholarshipInfoBlockTitle.propTypes = {
  campaignId: PropTypes.number,
  utmLabel: PropTypes.string,
};

ScholarshipInfoBlockTitle.defaultProps = {
  campaignId: null,
  utmLabel: null,
};

export default ScholarshipInfoBlockTitle;

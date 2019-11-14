import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query as ApolloQuery } from 'react-apollo';

import CausePage from './CausePage';
import ErrorPage from '../ErrorPage';
import { env } from '../../../helpers';
import NotFoundPage from '../NotFoundPage';
import { NetworkStatus } from '../../../constants';
import Placeholder from '../../utilities/Placeholder';

const CAUSE_PAGE_QUERY = gql`
  query CausePageQuery($slug: String!, $preview: Boolean!) {
    causePageBySlug(slug: $slug, preview: $preview) {
      coverImage {
        url
        description
      }
      superTitle
      title
      description
      content
    }
  }
`;

const CausePageQuery = ({ slug }) => (
  <>
    <ApolloQuery
      query={CAUSE_PAGE_QUERY}
      variables={{ slug, preview: env('CONTENTFUL_USE_PREVIEW_API') }}
      notifyOnNetworkStatusChange
    >
      {result => {
        // On initial load, just display a loading spinner.
        if (result.networkStatus === NetworkStatus.LOADING) {
          return <Placeholder />;
        }

        if (result.error) {
          return <ErrorPage />;
        }

        const { causePageBySlug } = result.data;

        return causePageBySlug ? (
          <CausePage {...causePageBySlug} />
        ) : (
          <NotFoundPage />
        );
      }}
    </ApolloQuery>
  </>
);

CausePageQuery.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CausePageQuery;

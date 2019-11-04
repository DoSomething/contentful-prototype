import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import CausePage from './CausePage';
import { env } from '../../../helpers';
import NotFoundPage from '../NotFoundPage';

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
  <Query
    query={CAUSE_PAGE_QUERY}
    variables={{ slug, preview: env('CONTENTFUL_USE_PREVIEW_API') }}
  >
    {({ causePageBySlug }) =>
      causePageBySlug ? <CausePage {...causePageBySlug} /> : <NotFoundPage />
    }
  </Query>
);

CausePageQuery.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CausePageQuery;

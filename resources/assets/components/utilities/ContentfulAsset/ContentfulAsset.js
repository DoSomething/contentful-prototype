import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import LazyImage from '../LazyImage';
import { env } from '../../../helpers/env';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';

const CONTENTFUL_ASSET_QUERY = gql`
  query ContentfulAssetQuery(
    $id: String!
    $width: Int!
    $height: Int!
    $preview: Boolean!
  ) {
    asset(id: $id, preview: $preview) {
      id
      description
      url(w: $width, h: $height)
    }
  }
`;

const ContentfulAsset = ({ id, width, height }) => (
  <Query
    query={CONTENTFUL_ASSET_QUERY}
    variables={{
      id,
      width,
      height,
      preview: env('CONTENTFUL_USE_PREVIEW_API', false),
    }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <Spinner className="flex justify-center py-12" />;
      }

      if (error || !data.asset) {
        return (
          <ErrorBlock
            error={error || `Could not load Contentful Asset for ID: ${id}.`}
          />
        );
      }

      const { url, description } = data.asset;

      return <LazyImage className="inline" src={url} alt={description} />;
    }}
  </Query>
);

ContentfulAsset.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

ContentfulAsset.defaultProps = {
  width: 700,
  height: 700,
};

export default ContentfulAsset;

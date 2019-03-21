import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import LazyImage from '../LazyImage';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';

const CONTENTFUL_ASSET_QUERY = gql`
  query ContentfulAssetQuery($id: String!, $width: Int!, $height: Int!) {
    asset(id: $id) {
      id
      description
      url(w: $width, h: $height)
    }
  }
`;

const ContentfulAsset = ({ id, width, height }) => (
  <Query query={CONTENTFUL_ASSET_QUERY} variables={{ id, width, height }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div className="spinner -centered margin-vertical-xlg" />;
      }

      if (error || !data.asset) {
        return <ErrorBlock />;
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
  className: null,
  width: 700,
  height: 700,
};

export default ContentfulAsset;

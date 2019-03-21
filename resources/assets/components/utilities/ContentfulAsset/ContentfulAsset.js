import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import LazyImage from '../LazyImage';
import Card from '../Card/Card';
import TextContent from '../TextContent/TextContent';
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

const ContentfulAsset = ({ className, id, width, height }) => (
  <Query query={CONTENTFUL_ASSET_QUERY} variables={{ id, width, height }}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <div className="grid-main spinner -centered margin-vertical-xlg" />
        );
      }

      if (error) {
        return (
          <div className="component-entry grid-main margin-bottom-md">
            <ErrorBlock />
          </div>
        );
      }

      if (!data.asset) {
        return (
          // @TODO: repurpose NotFound component to be customizeable; using basic Card component for now.
          <Card className="component-entry grid-main margin-bottom-md rounded bordered">
            <TextContent className="padded text-center">
              Sorry! The specified asset was not found.
            </TextContent>
          </Card>
        );
      }

      return (
        <div className={className}>
          <LazyImage src={data.asset.url} alt={data.asset.description} />
        </div>
      );
    }}
  </Query>
);

ContentfulAsset.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

ContentfulAsset.defaultProps = {
  className: null,
  width: 700,
  height: 700,
};

export default ContentfulAsset;

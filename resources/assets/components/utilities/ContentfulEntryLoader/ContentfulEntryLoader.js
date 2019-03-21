import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Card from '../Card/Card';
import ContentfulEntry from '../../ContentfulEntry';
import TextContent from '../TextContent/TextContent';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';

const CONTENTFUL_BLOCK_QUERY = gql`
  query ContentfulBlockQuery($id: String!) {
    block(id: $id) {
      id
      ... on ImagesBlock {
        images {
          description
          url(w: 500, h: 500, fit: FILL)
        }
      }
      ... on EmbedBlock {
        url
      }
      ... on PostGalleryBlock {
        actionIds
      }
      ... on TextSubmissionBlock {
        actionId
        title
        textFieldLabel
        textFieldPlaceholderMessage
        buttonText
        informationTitle
        informationContent
        affirmationContent
      }
      ... on PetitionSubmissionBlock {
        actionId
        title
        content
        textFieldPlaceholderMessage
        buttonText
        informationTitle
        informationContent
        affirmationContent
      }
    }
  }
`;

const ContentfulEntryLoader = ({ id }) => (
  <Query query={CONTENTFUL_BLOCK_QUERY} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div className="spinner -centered margin-vertical-xlg" />;
      }

      if (error) {
        return <ErrorBlock />;
      }

      if (!data.block) {
        return (
          // @TODO: repurpose NotFound component to be customizeable; using basic Card component for now.
          <Card className="margin-bottom-md rounded bordered">
            <TextContent className="padded text-center">
              Sorry! The specified content was not found.
            </TextContent>
          </Card>
        );
      }

      const entryGridMapping = {
        EmbedBlock: 'grid-wide', // @TODO: may need to reassess, since maybe not all embeds should align to wide?
        PostGalleryBlock: 'grid-wide',
      };

      const blockType = data.block.__typename;
      const gridClass = get(entryGridMapping, blockType, 'grid-main');

      return <ContentfulEntry className={gridClass} json={data.block} />;
    }}
  </Query>
);

ContentfulEntryLoader.propTypes = {
  id: PropTypes.string.isRequired,
};

ContentfulEntryLoader.defaultProps = {
  className: null,
};

export default ContentfulEntryLoader;

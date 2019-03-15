import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import Card from '../Card/Card';
import ContentfulEntry from '../../ContentfulEntry';
import TextContent from '../TextContent/TextContent';

const CONTENTFUL_BLOCK_QUERY = gql`
  query ContentfulBlockQuery($id: String!) {
    block(id: $id) {
      id

      ... on PostGallery {
        actionIds
      }
      ... on TextSubmissionAction {
        actionId
        title
        textFieldLabel
        textFieldPlaceholderMessage
        buttonText
        informationTitle
        informationContent
        affirmationContent
      }
      ... on PetitionSubmissionAction {
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

const ContentfulEntryLoader = ({ id, className }) => (
  <Query query={CONTENTFUL_BLOCK_QUERY} variables={{ id }}>
    {({ loading, error, data }) => {
      if (error) {
        return (
          // @TODO: repurpose NotFound component to be customizeable; using basic Card component for now.
          <Card className="rounded bordered">
            <TextContent className="padded">
              Sorry! The specified content was not found.
            </TextContent>
          </Card>
        );
      }

      if (loading) {
        return (
          <div className="grid-main spinner -centered margin-vertical-md" />
        );
      }

      const entryGridMapping = {
        embed: 'grid-wide', // @TODO: may need to reassess, since maybe not all embeds should align to wide?
        postGallery: 'grid-wide',
      };

      const gridClass = get(entryGridMapping, data.block.type, 'grid-main');

      return (
        <ContentfulEntry
          className={classnames(className, gridClass)}
          json={data.block}
        />
      );
    }}
  </Query>
);

ContentfulEntryLoader.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ContentfulEntryLoader.defaultProps = {
  className: null,
};

export default ContentfulEntryLoader;

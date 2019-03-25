import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import ContentfulEntry from '../../ContentfulEntry';
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
      ... on LinkBlock {
        title
        content
        link
        buttonText
        affiliateLogo {
          url(w: 400, h: 200)
          description
        }
        template
        additionalContent
      }
      ... on PostGalleryBlock {
        actionIds
        itemsPerRow
      }
      ... on PhotoSubmissionBlock {
        actionId
        title
        captionFieldLabel
        captionFieldPlaceholderMessage
        showQuantityField
        quantityFieldLabel
        quantityFieldPlaceholder
        whyParticipatedFieldLabel
        whyParticipatedFieldPlaceholder
        buttonText
        informationTitle
        informationContent
        affirmationContent
        additionalContent
      }
      ... on ShareBlock {
        actionId
        title
        socialPlatform
        content
        link
        hideEmbed
        affirmationBlock {
          id
        }
        affirmation
        additionalContent
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
      ... on VoterRegistrationBlock {
        title
        content
        link
        additionalContent
      }
    }
  }
`;

const ContentfulEntryLoader = ({ id, className }) => (
  <Query query={CONTENTFUL_BLOCK_QUERY} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <div className="grid-main spinner -centered margin-vertical-xlg" />
        );
      }

      if (error || !data.block) {
        return (
          <div className={classnames(className, 'grid-main')}>
            <ErrorBlock />
          </div>
        );
      }

      const entryGridMapping = {
        EmbedBlock: 'grid-wide', // @TODO: may need to reassess, since maybe not all embeds should align to wide?
        PostGalleryBlock: 'grid-wide',
      };

      const blockType = data.block.__typename;
      const gridClass = get(entryGridMapping, blockType, 'grid-main');

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

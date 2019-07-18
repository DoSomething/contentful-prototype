import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import { env } from '../../../helpers';
import ContentfulEntry from '../../ContentfulEntry';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import { EmbedBlockFragment } from '../Iframe';
import { LinkBlockFragment } from '../../actions/LinkAction/LinkAction';
import { ImagesBlockFragment } from '../../blocks/ImagesBlock/ImagesBlock';
import { ShareBlockFragment } from '../../actions/ShareAction/ShareAction';
import { GalleryBlockFragment } from '../../blocks/GalleryBlock/GalleryBlock';
import { PostGalleryBlockFragment } from '../../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import { TextSubmissionBlockFragment } from '../../actions/TextSubmissionAction/TextSubmissionAction';
import { PhotoSubmissionBlockFragment } from '../../actions/PhotoSubmissionAction/PhotoSubmissionAction';
import { VoterRegistrationBlockFragment } from '../../actions/VoterRegistrationAction/VoterRegistrationAction';
import { PetitionSubmissionBlockFragment } from '../../actions/PetitionSubmissioncAction/PetitionSubmissionAction';

const CONTENTFUL_BLOCK_QUERY = gql`
  query ContentfulBlockQuery($id: String!, $preview: Boolean!) {
    block(id: $id, preview: $preview) {
      id
      ...LinkBlockFragment
      ...ShareBlockFragment
      ...EmbedBlockFragment
      ...ImagesBlockFragment
      ...GalleryBlockFragment
      ...PostGalleryBlockFragment
      ...TextSubmissionBlockFragment
      ...PhotoSubmissionBlockFragment
      ...VoterRegistrationBlockFragment
      ...PetitionSubmissionBlockFragment
    }
  }

  ${LinkBlockFragment}
  ${ShareBlockFragment}
  ${EmbedBlockFragment}
  ${ImagesBlockFragment}
  ${GalleryBlockFragment}
  ${PostGalleryBlockFragment}
  ${TextSubmissionBlockFragment}
  ${PhotoSubmissionBlockFragment}
  ${VoterRegistrationBlockFragment}
  ${PetitionSubmissionBlockFragment}
`;

const ContentfulEntryLoader = ({ id, className }) => (
  <Query
    query={CONTENTFUL_BLOCK_QUERY}
    variables={{ id, preview: env('CONTENTFUL_USE_PREVIEW_API') }}
  >
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
        <div className={classnames(className, gridClass)}>
          <ContentfulEntry json={data.block} />
        </div>
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

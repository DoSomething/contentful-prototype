import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import { env } from '../../../helpers';
import ContentfulEntry from '../../ContentfulEntry';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import { EmbedBlockFragment } from '../../blocks/EmbedBlock/EmbedBlock';
import { LinkBlockFragment } from '../../actions/LinkAction/LinkAction';
import { ImagesBlockFragment } from '../../blocks/ImagesBlock/ImagesBlock';
import { ShareBlockFragment } from '../../actions/ShareAction/ShareAction';
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
  ${PostGalleryBlockFragment}
  ${TextSubmissionBlockFragment}
  ${PhotoSubmissionBlockFragment}
  ${VoterRegistrationBlockFragment}
  ${PetitionSubmissionBlockFragment}
`;

const ContentfulEntryLoader = ({
  id,
  className,
  classNameByEntry,
  classNameByEntryDefault,
}) => (
  <Query
    query={CONTENTFUL_BLOCK_QUERY}
    variables={{ id, preview: env('CONTENTFUL_USE_PREVIEW_API') }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <div className="grid-narrow spinner -centered margin-vertical-xlg" />
        );
      }

      if (error || !data.block) {
        return (
          <div className={classnames(className, 'grid-narrow')}>
            <ErrorBlock />
          </div>
        );
      }

      const blockType = data.block.__typename;

      const entryClassNames = get(
        classNameByEntry,
        blockType,
        classNameByEntryDefault || 'grid-main',
      );

      return (
        <div className={classnames(className, entryClassNames)}>
          <ContentfulEntry json={data.block} />
        </div>
      );
    }}
  </Query>
);

ContentfulEntryLoader.propTypes = {
  className: PropTypes.string,
  classNameByEntry: PropTypes.object,
  classNameByEntryDefault: PropTypes.string,
  id: PropTypes.string.isRequired,
};

ContentfulEntryLoader.defaultProps = {
  className: null,
  classNameByEntry: {},
  classNameByEntryDefault: null,
};

export default ContentfulEntryLoader;

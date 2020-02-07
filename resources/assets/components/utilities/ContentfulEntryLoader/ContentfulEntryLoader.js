import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import NotFound from '../../NotFound';
import { env } from '../../../helpers';
import ContentfulEntry from '../../ContentfulEntry';
import { QuizBlockFragment } from '../../Quiz/Quiz';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import { SoftEdgeBlockFragment } from '../../actions/SoftEdgeBlock';
import { EmbedBlockFragment } from '../../blocks/EmbedBlock/EmbedBlock';
import { LinkBlockFragment } from '../../actions/LinkAction/LinkAction';
import { AffirmationBlockFragment } from '../../Affirmation/Affirmation';
import { ImagesBlockFragment } from '../../blocks/ImagesBlock/ImagesBlock';
import { ShareBlockFragment } from '../../actions/ShareAction/ShareAction';
import { CallToActionBlockFragment } from '../../CallToAction/CallToAction';
import { GalleryBlockFragment } from '../../blocks/GalleryBlock/GalleryBlock';
import { ContentBlockFragment } from '../../blocks/ContentBlock/ContentBlock';
import { CampaignDashboardFragment } from '../CampaignDashboard/CampaignDashboard';
import { SixpackExperimentBlockFragment } from '../SixpackExperiment/SixpackExperiment';
import { CampaignUpdateBlockFragment } from '../../blocks/CampaignUpdate/CampaignUpdate';
import { SocialDriveBlockFragment } from '../../actions/SocialDriveAction/SocialDriveAction';
import { PostGalleryBlockFragment } from '../../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import { CurrentSchoolBlockFragment } from '../../blocks/CurrentSchoolBlock/CurrentSchoolBlock';
import { TextSubmissionBlockFragment } from '../../actions/TextSubmissionAction/TextSubmissionAction';
import { PhotoSubmissionBlockFragment } from '../../actions/PhotoSubmissionAction/PhotoSubmissionAction';
import { VoterRegistrationBlockFragment } from '../../actions/VoterRegistrationAction/VoterRegistrationAction';
import { PetitionSubmissionBlockFragment } from '../../actions/PetitionSubmissioncAction/PetitionSubmissionAction';
import { SelectionSubmissionBlockFragment } from '../../actions/SelectionSubmissionAction/SelectionSubmissionAction';

const CONTENTFUL_BLOCK_QUERY = gql`
  query ContentfulBlockQuery($id: String!, $preview: Boolean!) {
    block(id: $id, preview: $preview) {
      id
      ... on LinkBlock {
        ...LinkBlockFragment
      }
      ... on QuizBlock {
        ...QuizBlockFragment
      }
      ... on ShareBlock {
        ...ShareBlockFragment
      }
      ... on EmbedBlock {
        ...EmbedBlockFragment
      }
      ... on ImagesBlock {
        ...ImagesBlockFragment
      }
      ... on GalleryBlock {
        ...GalleryBlockFragment
      }
      ... on ContentBlock {
        ...ContentBlockFragment
      }
      ... on SoftEdgeBlock {
        ...SoftEdgeBlockFragment
      }
      ... on AffirmationBlock {
        ...AffirmationBlockFragment
      }
      ... on SocialDriveBlock {
        ...SocialDriveBlockFragment
      }
      ... on PostGalleryBlock {
        ...PostGalleryBlockFragment
      }
      ... on CallToActionBlock {
        ...CallToActionBlockFragment
      }
      ... on CampaignDashboard {
        ...CampaignDashboardFragment
      }
      ... on CurrentSchoolBlock {
        ...CurrentSchoolBlockFragment
      }
      ... on CampaignUpdateBlock {
        ...CampaignUpdateBlockFragment
      }
      ... on TextSubmissionBlock {
        ...TextSubmissionBlockFragment
      }
      ... on PhotoSubmissionBlock {
        ...PhotoSubmissionBlockFragment
      }
      ... on SixpackExperimentBlock {
        ...SixpackExperimentBlockFragment
      }
      ... on VoterRegistrationBlock {
        ...VoterRegistrationBlockFragment
      }
      ... on PetitionSubmissionBlock {
        ...PetitionSubmissionBlockFragment
      }
      ... on SelectionSubmissionBlock {
        ...SelectionSubmissionBlockFragment
      }
    }
  }

  ${LinkBlockFragment}
  ${QuizBlockFragment}
  ${ShareBlockFragment}
  ${EmbedBlockFragment}
  ${ImagesBlockFragment}
  ${GalleryBlockFragment}
  ${ContentBlockFragment}
  ${SoftEdgeBlockFragment}
  ${AffirmationBlockFragment}
  ${SocialDriveBlockFragment}
  ${PostGalleryBlockFragment}
  ${CallToActionBlockFragment}
  ${CampaignDashboardFragment}
  ${CurrentSchoolBlockFragment}
  ${CampaignUpdateBlockFragment}
  ${TextSubmissionBlockFragment}
  ${PhotoSubmissionBlockFragment}
  ${SixpackExperimentBlockFragment}
  ${VoterRegistrationBlockFragment}
  ${PetitionSubmissionBlockFragment}
  ${SelectionSubmissionBlockFragment}
`;

const ContentfulEntryLoader = ({
  id,
  className,
  classNameByEntry,
  classNameByEntryDefault,
}) => {
  const { loading, error, data } = useQuery(CONTENTFUL_BLOCK_QUERY, {
    variables: { id, preview: env('CONTENTFUL_USE_PREVIEW_API', false) },
  });

  if (loading) {
    return <Spinner className="grid-narrow flex justify-center py-12" />;
  }

  if (error) {
    return (
      <div className={classnames(className, 'grid-narrow')}>
        <ErrorBlock error={error} />
      </div>
    );
  }

  if (!data.block) {
    return (
      <div className={classnames(className, 'grid-narrow')}>
        <NotFound />
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
    <div
      data-contentful-id={id}
      className={classnames(className, entryClassNames)}
    >
      <ContentfulEntry json={data.block} />
    </div>
  );
};

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

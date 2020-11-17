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
import { GalleryBlockFragment } from '../../blocks/GalleryBlock/GalleryBlock';
import { ContentBlockFragment } from '../../blocks/ContentBlock/ContentBlock';
import { CampaignDashboardFragment } from '../CampaignDashboard/CampaignDashboard';
import { SixpackExperimentBlockFragment } from '../SixpackExperiment/SixpackExperiment';
import { CampaignUpdateBlockFragment } from '../../blocks/CampaignUpdate/CampaignUpdate';
import { ActionStatsBlockFragment } from '../../blocks/ActionStatsBlock/ActionStatsBlock';
import { SocialDriveBlockFragment } from '../../actions/SocialDriveAction/SocialDriveAction';
import { PostGalleryBlockFragment } from '../../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import { CurrentSchoolBlockFragment } from '../../blocks/CurrentSchoolBlock/CurrentSchoolBlock';
import { SignupReferralsBlockFragment } from '../../blocks/SignupReferralsBlock/SignupReferralsBlock';
import { TextSubmissionBlockFragment } from '../../actions/TextSubmissionAction/TextSubmissionAction';
import { PhotoSubmissionBlockFragment } from '../../actions/PhotoSubmissionAction/PhotoSubmissionAction';
import { VoterRegistrationBlockFragment } from '../../actions/VoterRegistrationAction/VoterRegistrationAction';
import { PetitionSubmissionBlockFragment } from '../../actions/PetitionSubmissioncAction/PetitionSubmissionAction';
import { SelectionSubmissionBlockFragment } from '../../actions/SelectionSubmissionAction/SelectionSubmissionAction';
import { VoterRegistrationDriveBlockFragment } from '../../actions/VoterRegistrationDriveAction/VoterRegistrationDriveAction';
import { VoterRegistrationReferralsBlockFragment } from '../../blocks/VoterRegistrationReferralsBlock/VoterRegistrationReferralsBlock';

export const CONTENTFUL_BLOCK_QUERY = gql`
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
      ... on ActionStatsBlock {
        ...ActionStatsBlockFragment
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
      ... on SignupReferralsBlock {
        ...SignupReferralsBlockFragment
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
      ... on VoterRegistrationDriveBlock {
        ...VoterRegistrationDriveBlockFragment
      }
      ... on VoterRegistrationReferralsBlock {
        ...VoterRegistrationReferralsBlockFragment
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
  ${ActionStatsBlockFragment}
  ${AffirmationBlockFragment}
  ${SocialDriveBlockFragment}
  ${PostGalleryBlockFragment}
  ${CampaignDashboardFragment}
  ${CurrentSchoolBlockFragment}
  ${CampaignUpdateBlockFragment}
  ${TextSubmissionBlockFragment}
  ${PhotoSubmissionBlockFragment}
  ${SignupReferralsBlockFragment}
  ${SixpackExperimentBlockFragment}
  ${VoterRegistrationBlockFragment}
  ${PetitionSubmissionBlockFragment}
  ${SelectionSubmissionBlockFragment}
  ${VoterRegistrationDriveBlockFragment}
  ${VoterRegistrationReferralsBlockFragment}
`;

const ContentfulEntryLoader = ({
  id,
  className,
  classNameByEntry,
  classNameByEntryDefault,
  customProps,
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
        <NotFound id={id} />
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
      <ContentfulEntry json={data.block} {...get(customProps, blockType)} />
    </div>
  );
};

ContentfulEntryLoader.propTypes = {
  className: PropTypes.string,
  classNameByEntry: PropTypes.object,
  classNameByEntryDefault: PropTypes.string,
  id: PropTypes.string.isRequired,
  customProps: PropTypes.object,
};

ContentfulEntryLoader.defaultProps = {
  className: null,
  classNameByEntry: {},
  classNameByEntryDefault: null,
  customProps: {},
};

export default ContentfulEntryLoader;

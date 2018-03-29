/* @flow */

import React from 'react';

import QuizContainer from '../Quiz/QuizContainer';
import { ContentfulEntryJson } from '../../types';
import StaticBlock from '../StaticBlock';
import ReportbackBlock from '../ReportbackBlock';
import NotFound from '../NotFound';
import { CampaignUpdateContainer } from '../CampaignUpdate';
import CallToActionContainer from '../CallToAction/CallToActionContainer';
import CampaignGalleryBlockContainer from '../CampaignGalleryBlock/CampaignGalleryBlockContainer';
import { parseContentfulType } from '../../helpers';
import LegacyQuizContainer from '../LegacyQuiz/LegacyQuizContainer';
import {
  renderCompetitionStep, renderPhotoUploader, renderSubmissionGallery,
  renderThirdPartyAction, renderContentBlock, renderVoterRegistrationAction,
  renderShareAction, renderLinkAction, renderAffirmation, renderTextSubmissionAction,
} from './renderers';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: ContentfulEntryJson = { fields: { type: null } };

type ContentfulEntryProps = { json: ContentfulEntryJson, stepIndex: number, isSignedUp: boolean };

const ContentfulEntry = ({
  json = DEFAULT_BLOCK, stepIndex = 1, isSignedUp,
}: ContentfulEntryProps) => {
  const type = parseContentfulType(json);

  switch (type) {
    case 'affirmation':
      return renderAffirmation(json);

    case 'callToAction':
      return (
        <CallToActionContainer
          actionText={json.fields.actionText}
          content={json.fields.content}
          impactPrefix={json.fields.impactPrefix}
          impactSuffix={json.fields.impactSuffix}
          impactValue={json.fields.impactValue}
          visualStyle={json.fields.visualStyle}
          useCampaignTagline={json.fields.useCampaignTagline}
        />
      );

    case 'campaignUpdate':
      return (
        <CampaignUpdateContainer
          id={json.id}
          affiliateLogo={json.fields.affiliateLogo}
          author={json.fields.author}
          content={json.fields.content}
          displayOptions={json.fields.displayOptions}
          link={json.fields.link}
        />
      );

    case 'competition':
      return renderCompetitionStep(json);

    case 'contentBlock':
      return renderContentBlock(json, stepIndex);

    case 'gallery':
      return <CampaignGalleryBlockContainer />;

    case 'linkAction':
      return renderLinkAction(json);

    case 'photoUploaderAction':
    case 'photo-uploader':
      return renderPhotoUploader(json, isSignedUp);

    case 'quiz':
      return <QuizContainer {...json.fields} />;

    case 'quizBeta':
      return <LegacyQuizContainer quizContent={json} />;

    // @TODO: Will be refactored when switching to Rogue!
    case 'reportbacks':
      return (
        <ReportbackBlock
          reportbacks={json.reportbacks}
        />
      );

    case 'shareAction':
      return renderShareAction(json);

    case 'static':
      return (
        <StaticBlock
          content={json.fields.content}
          source={json.fields.source}
          title={json.fields.title}
        />
      );

    case 'submission-gallery':
      return renderSubmissionGallery(isSignedUp);

    case 'textSubmissionAction':
      return renderTextSubmissionAction(json);

    case 'third-party-action':
      return renderThirdPartyAction(json, stepIndex);

    case 'voterRegistrationAction':
      return renderVoterRegistrationAction(json, stepIndex);

    default:
      return <NotFound />;
  }
};

export default ContentfulEntry;

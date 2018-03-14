/* @flow */

import React from 'react';

import Quiz from '../Quiz';
import { ContentfulEntryJson } from '../../types';
import StaticBlock from '../StaticBlock';
import ReportbackBlock from '../ReportbackBlock';
import NotFound from '../NotFound';
import { CampaignUpdateContainer } from '../CampaignUpdate';
import CallToActionContainer from '../CallToAction/CallToActionContainer';
import { PostGalleryContainer } from '../Gallery/PostGallery';
import { parseContentfulType } from '../../helpers';
import {
  renderCompetitionStep, renderPhotoUploader, renderSubmissionGallery,
  renderThirdPartyAction, renderContentBlock, renderVoterRegistrationAction,
  renderShareAction, renderLinkAction, renderAffirmation,
} from './renderers';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: ContentfulEntryJson = { fields: { type: null } };

type ContentfulEntryProps = { json: ContentfulEntryJson, stepIndex: number, isSignedUp: boolean };

const ContentfulEntry = ({
  json = DEFAULT_BLOCK, stepIndex = 1, isSignedUp,
}: ContentfulEntryProps) => {
  const type = parseContentfulType(json);

  switch (type) {
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

    case 'quiz':
      return <Quiz />;

    // @TODO: Will be refactored when switching to Rogue!
    case 'reportbacks':
      return (
        <ReportbackBlock
          reportbacks={json.reportbacks}
        />
      );

    case 'static':
      return (
        <StaticBlock
          content={json.fields.content}
          source={json.fields.source}
          title={json.fields.title}
        />
      );

    case 'gallery':
      return <PostGalleryContainer />;

    case 'affirmation':
      return renderAffirmation(json);

    case 'competition':
      return renderCompetitionStep(json);

    case 'photoUploaderAction':
    case 'photo-uploader':
      return renderPhotoUploader(json, isSignedUp);

    case 'submission-gallery':
      return renderSubmissionGallery(isSignedUp);

    case 'third-party-action':
      return renderThirdPartyAction(json, stepIndex);

    case 'voterRegistrationAction':
      return renderVoterRegistrationAction(json, stepIndex);

    case 'shareAction':
      return renderShareAction(json);

    case 'linkAction':
      return renderLinkAction(json);

    case 'contentBlock':
      return renderContentBlock(json, stepIndex);

    default:
      return <NotFound />;
  }
};

export default ContentfulEntry;

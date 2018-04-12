/* @flow */

import React from 'react';

import NotFound from '../NotFound';
import StaticBlock from '../StaticBlock';
import ReportbackBlock from '../ReportbackBlock';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import QuizContainer from '../Quiz/QuizContainer';
import { ContentfulEntryJson } from '../../types';
import { parseContentfulType } from '../../helpers';
import { CampaignUpdateContainer } from '../CampaignUpdate';
import LegacyQuizContainer from '../LegacyQuiz/LegacyQuizContainer';
import CallToActionContainer from '../CallToAction/CallToActionContainer';
import CampaignGalleryBlockContainer from '../blocks/CampaignGalleryBlock/CampaignGalleryBlockContainer';
import {
  renderCompetitionStep,
  renderPhotoUploader,
  renderSubmissionGallery,
  renderThirdPartyAction,
  renderLegacyContentBlock,
  renderVoterRegistrationAction,
  renderShareAction,
  renderLinkAction,
  renderAffirmation,
  renderTextSubmissionAction,
  renderContentBlock,
} from './renderers';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: ContentfulEntryJson = { fields: { type: null } };

type Props = {
  json: ContentfulEntryJson,
  stepIndex: number,
  isSignedUp: boolean,
};
type State = { hasError: boolean };

class ContentfulEntry extends React.Component<Props, State> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });

    // @TODO: We should report this somewhere!
    // report(error, info);
  }

  render() {
    // Did we hit an error? :(
    if (this.state.hasError) {
      return <ErrorBlock />;
    }

    // Otherwise, find the corresponding component & render it!
    const { json = DEFAULT_BLOCK, stepIndex = 1, isSignedUp } = this.props;
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
        return renderContentBlock(json);

      case 'gallery':
        return <CampaignGalleryBlockContainer />;

      case 'legacyContentBlock':
        return renderLegacyContentBlock(json, stepIndex);

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
        return <ReportbackBlock reportbacks={json.reportbacks} />;

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
  }
}

export default ContentfulEntry;

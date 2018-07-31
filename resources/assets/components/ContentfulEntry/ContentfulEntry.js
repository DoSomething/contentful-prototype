/* @flow */

import React from 'react';

import NotFound from '../NotFound';
import Loader from '../utilities/Loader';
import StaticBlock from '../StaticBlock';
import ReportbackBlock from '../ReportbackBlock';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { ContentfulEntryJson } from '../../types';
import { CampaignUpdateContainer } from '../CampaignUpdate';
import ImagesBlock from '../blocks/ImagesBlock/ImagesBlock';
import { parseContentfulType, report, withoutNulls } from '../../helpers';
import CallToActionContainer from '../CallToAction/CallToActionContainer';
import SocialDriveActionContainer from '../actions/SocialDriveAction/SocialDriveActionContainer';
import SixpackExperimentContainer from '../utilities/SixpackExperiment/SixpackExperimentContainer';
import CampaignGalleryBlockContainer from '../blocks/CampaignGalleryBlock/CampaignGalleryBlockContainer';
import {
  renderLinkAction,
  renderAffirmation,
  renderShareAction,
  renderContentBlock,
  renderPhotoSubmissionAction,
  renderTextSubmissionAction,
  renderVoterRegistrationAction,
  renderReferralSubmissionAction,
} from './renderers';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: ContentfulEntryJson = { fields: { type: null } };

type Props = {
  json: ContentfulEntryJson,
};
type State = { hasError: boolean };

class ContentfulEntry extends React.Component<Props, State> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
    report(error);
  }

  render() {
    // Did we hit an error? :(
    if (this.state.hasError) {
      return <ErrorBlock />;
    }

    // Otherwise, find the corresponding component & render it!
    const { json = DEFAULT_BLOCK } = this.props;
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

      case 'contentBlock':
        return renderContentBlock(json);

      case 'gallery':
        return (
          <div className="margin-horizontal-md">
            <CampaignGalleryBlockContainer />
          </div>
        );

      case 'imagesBlock':
        return <ImagesBlock images={json.fields.images} />;

      case 'linkAction':
        return renderLinkAction(json);

      case 'page':
        return (
          <StaticBlock
            content={json.fields.content}
            source={json.fields.source}
            title={json.fields.title}
          />
        );

      case 'photoSubmissionAction':
        return renderPhotoSubmissionAction(json);

      case 'quiz': {
        const QuizContainer = Loader(import('../Quiz/QuizContainer'));
        return <QuizContainer {...json.fields} />;
      }

      case 'quizBeta': {
        const LegacyQuiz = Loader(import('../LegacyQuiz/LegacyQuizContainer'));
        return <LegacyQuiz quizContent={json} />;
      }

      case 'referralSubmissionAction':
        return renderReferralSubmissionAction(json);

      // @TODO: Will be refactored when switching to Rogue!
      case 'reportbacks':
        return <ReportbackBlock reportbacks={json.reportbacks} />;

      case 'shareAction':
        return renderShareAction(json);

      case 'sixpackExperiment':
        return (
          <SixpackExperimentContainer
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'socialDriveAction':
        return (
          <div className="margin-horizontal-md margin-bottom-lg">
            <SocialDriveActionContainer {...json.fields} />
          </div>
        );

      case 'static':
        return (
          <StaticBlock
            content={json.fields.content}
            source={json.fields.source}
            title={json.fields.title}
          />
        );

      case 'textSubmissionAction':
        return renderTextSubmissionAction(json);

      case 'voterRegistrationAction':
        return renderVoterRegistrationAction(json);

      default:
        return <NotFound />;
    }
  }
}

export default ContentfulEntry;

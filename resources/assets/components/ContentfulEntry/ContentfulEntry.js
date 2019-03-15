/* @flow */

import { React, Fragment } from 'react';

import NotFound from '../NotFound';
import Iframe from '../utilities/Iframe';
import Loader from '../utilities/Loader';
import StaticBlock from '../StaticBlock';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { ContentfulEntryJson } from '../../types';
import PollLocator from '../PollLocator/PollLocator';
import { CampaignUpdateContainer } from '../CampaignUpdate';
import ImagesBlock from '../blocks/ImagesBlock/ImagesBlock';
import GalleryBlock from '../blocks/GalleryBlock/GalleryBlock';
import SectionBlock from '../blocks/SectionBlock/SectionBlock';
import { parseContentfulType, report, withoutNulls } from '../../helpers';
import CallToActionContainer from '../CallToAction/CallToActionContainer';
import LandingPageContainer from '../pages/LandingPage/LandingPageContainer';
import PostGalleryBlockQuery from '../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import SocialDriveActionContainer from '../actions/SocialDriveAction/SocialDriveActionContainer';
import SixpackExperimentContainer from '../utilities/SixpackExperiment/SixpackExperimentContainer';
import CampaignGalleryBlockContainer from '../blocks/CampaignGalleryBlock/CampaignGalleryBlockContainer';
import TextSubmissionActionContainer from '../actions/TextSubmissionAction/TextSubmissionActionContainer';
import SubmissionGalleryBlockContainer from '../blocks/SubmissionGalleryBlock/SubmissionGalleryBlockContainer';
import PetitionSubmissionActionContainer from '../actions/PetitionSubmissioncAction/PetitionSubmissionActionContainer';
import {
  renderLinkAction,
  renderAffirmation,
  renderShareAction,
  renderContentBlock,
  renderPhotoSubmissionAction,
  renderVoterRegistrationAction,
  renderReferralSubmissionAction,
} from './renderers';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: ContentfulEntryJson = { fields: { type: null } };

type Props = {
  json: ContentfulEntryJson,
  className: String,
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
    const { json = DEFAULT_BLOCK, className = null } = this.props;
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
        return renderContentBlock(json, className);

      case 'embed':
        return (
          <Iframe
            className={className}
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'gallery':
        return (
          <div className="margin-horizontal-md">
            <CampaignGalleryBlockContainer />
          </div>
        );

      case 'postGallery':
        return (
          <PostGalleryBlockQuery
            className={className}
            {...withoutNulls(json.fields)}
          />
        );

      case 'galleryBlock':
        return <GalleryBlock {...json.fields} />;

      case 'imagesBlock':
        return (
          <ImagesBlock className={className} images={json.fields.images} />
        );

      case 'landingPage':
        return <LandingPageContainer {...json.fields} />;

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

      case 'petitionSubmissionAction':
        return (
          <PetitionSubmissionActionContainer
            className={className}
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'photoSubmissionAction':
        return renderPhotoSubmissionAction(json);

      case 'poll_locator':
        return (
          <div className="margin-horizontal-md">
            <PollLocator {...withoutNulls(json.fields)} />
          </div>
        );

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

      case 'sectionBlock': {
        const fields = withoutNulls(json.fields);

        return <SectionBlock id={json.id} {...fields} />;
      }

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
        return (
          <Fragment>
            <TextSubmissionActionContainer
              className={className}
              id={json.id}
              {...withoutNulls(json.fields)}
            />
            <SubmissionGalleryBlockContainer
              className={className}
              type="text"
            />
          </Fragment>
        );

      case 'voterRegistrationAction':
        return renderVoterRegistrationAction(json);

      default:
        return <NotFound />;
    }
  }
}

export default ContentfulEntry;

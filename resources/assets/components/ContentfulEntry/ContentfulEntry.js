/* @flow */

import * as React from 'react';

import NotFound from '../NotFound';
import Loader from '../utilities/Loader';
import StaticBlock from '../StaticBlock';
import { ContentfulEntryJson } from '../../types';
import PollLocator from '../PollLocator/PollLocator';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';
import ImagesBlock from '../blocks/ImagesBlock/ImagesBlock';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import GalleryBlock from '../blocks/GalleryBlock/GalleryBlock';
import SectionBlock from '../blocks/SectionBlock/SectionBlock';
import AffirmationContainer from '../Affirmation/AffirmationContainer';
import { parseContentfulType, report, withoutNulls } from '../../helpers';
import CallToActionContainer from '../CallToAction/CallToActionContainer';
import EmbedBlockContainer from '../blocks/EmbedBlock/EmbedBlockContainer';
import LinkActionContainer from '../actions/LinkAction/LinkActionContainer';
import LandingPageContainer from '../pages/LandingPage/LandingPageContainer';
import ShareActionContainer from '../actions/ShareAction/ShareActionContainer';
import CampaignDashboard from '../utilities/CampaignDashboard/CampaignDashboard';
import SixpackExperiment from '../utilities/SixpackExperiment/SixpackExperiment';
import PostGalleryBlockQuery from '../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import CampaignUpdateContainer from '../blocks/CampaignUpdate/CampaignUpdateContainer';
import SocialDriveActionContainer from '../actions/SocialDriveAction/SocialDriveActionContainer';
import CampaignGalleryBlockContainer from '../blocks/CampaignGalleryBlock/CampaignGalleryBlockContainer';
import SoftEdgeWidgetActionContainer from '../actions/SoftEdgeWidgetAction/SoftEdgeWidgetActionContainer';
import TextSubmissionActionContainer from '../actions/TextSubmissionAction/TextSubmissionActionContainer';
import PhotoSubmissionActionContainer from '../actions/PhotoSubmissionAction/PhotoSubmissionActionContainer';
import SubmissionGalleryBlockContainer from '../blocks/SubmissionGalleryBlock/SubmissionGalleryBlockContainer';
import VoterRegistrationActionContainer from '../actions/VoterRegistrationAction/VoterRegistrationActionContainer';
import PetitionSubmissionActionContainer from '../actions/PetitionSubmissioncAction/PetitionSubmissionActionContainer';
import SelectionSubmissionActionContainer from '../actions/SelectionSubmissionAction/SelectionSubmissionActionContainer';

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
        /**
         * Note: For Affirmations, the json object includes an onClose function property,
         * used to close the Affirmation modal. This is a little bit of a hack, as our json
         * object is not truly json when it includes a function.
         * @see components/pages/PostSignupModal.js
         */
        return (
          <AffirmationContainer
            {...withoutNulls(json.fields)}
            onClose={json.onClose}
          />
        );

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

      case 'campaignDashboard':
        return (
          <CampaignDashboard id={json.id} {...withoutNulls(json.fields)} />
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
        return (
          <ContentBlock
            className={className}
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'embed':
        return (
          <EmbedBlockContainer
            className={className}
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'EmbedBlock':
        return (
          <EmbedBlockContainer
            className={className}
            id={json.id}
            {...withoutNulls(json)}
          />
        );

      case 'gallery':
        return <CampaignGalleryBlockContainer />;

      case 'postGallery':
        return (
          <PostGalleryBlockQuery
            id={json.id}
            className={className}
            {...withoutNulls(json.fields)}
          />
        );

      case 'PostGalleryBlock':
        return (
          <PostGalleryBlockQuery
            id={json.id}
            className={className}
            {...withoutNulls(json)}
          />
        );

      case 'galleryBlock':
        return <GalleryBlock {...json.fields} />;

      case 'imagesBlock':
        return (
          <ImagesBlock className={className} images={json.fields.images} />
        );

      case 'ImagesBlock':
        return <ImagesBlock className={className} images={json.images} />;

      case 'landingPage':
        return <LandingPageContainer {...json.fields} />;

      case 'LinkBlock':
        return <LinkActionContainer {...withoutNulls(json)} />;

      case 'linkAction':
        return (
          <LinkActionContainer id={json.id} {...withoutNulls(json.fields)} />
        );

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

      case 'PetitionSubmissionBlock':
        return (
          <PetitionSubmissionActionContainer
            className={className}
            id={json.id}
            {...withoutNulls(json)}
          />
        );

      case 'photoSubmissionAction':
        return (
          <React.Fragment>
            <PhotoSubmissionActionContainer
              id={json.id}
              {...withoutNulls(json.fields)}
            />
            <SubmissionGalleryBlockContainer
              actionId={json.fields.actionId}
              className="photo-submission-user-gallery margin-top-md"
              type="photo"
            />
          </React.Fragment>
        );

      case 'PhotoSubmissionBlock':
        return (
          <React.Fragment>
            <PhotoSubmissionActionContainer {...withoutNulls(json)} />
            <SubmissionGalleryBlockContainer
              actionId={json.actionId}
              className="photo-submission-user-gallery margin-top-md"
              type="photo"
            />
          </React.Fragment>
        );

      case 'poll_locator':
        return <PollLocator {...withoutNulls(json.fields)} />;

      case 'quiz': {
        const QuizContainer = Loader(import('../Quiz/QuizContainer'));
        return <QuizContainer {...json.fields} />;
      }

      case 'quizBeta': {
        const LegacyQuiz = Loader(import('../LegacyQuiz/LegacyQuizContainer'));
        return <LegacyQuiz quizContent={json} />;
      }

      case 'sectionBlock': {
        return (
          <SectionBlock
            className={className}
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );
      }

      case 'selectionSubmissionAction':
        return (
          <SelectionSubmissionActionContainer
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'shareAction':
        return (
          <ShareActionContainer id={json.id} {...withoutNulls(json.fields)} />
        );

      case 'ShareBlock':
        return <ShareActionContainer id={json.id} {...withoutNulls(json)} />;

      case 'sixpackExperiment':
        return (
          <SixpackExperiment id={json.id} {...withoutNulls(json.fields)} />
        );

      case 'socialDriveAction':
        return <SocialDriveActionContainer {...json.fields} />;

      case 'softEdgeWidgetAction':
        return <SoftEdgeWidgetActionContainer {...json.fields} />;

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
          <React.Fragment>
            <TextSubmissionActionContainer
              id={json.id}
              {...withoutNulls(json.fields)}
            />
            <SubmissionGalleryBlockContainer
              actionId={json.fields.actionId}
              className="text-submission-user-gallery margin-top-md"
              type="text"
            />
          </React.Fragment>
        );

      case 'TextSubmissionBlock':
        return (
          <React.Fragment>
            <TextSubmissionActionContainer
              id={json.id}
              {...withoutNulls(json)}
            />
            <SubmissionGalleryBlockContainer
              actionId={json.actionId}
              className="text-submission-user-gallery margin-top-md"
              type="text"
            />
          </React.Fragment>
        );

      case 'voterRegistrationAction':
        return (
          <VoterRegistrationActionContainer
            blockId={json.id}
            {...json.fields}
          />
        );

      case 'VoterRegistrationBlock':
        return <VoterRegistrationActionContainer blockId={json.id} {...json} />;

      default:
        return <NotFound />;
    }
  }
}

export default ContentfulEntry;

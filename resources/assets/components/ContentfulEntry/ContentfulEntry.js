/* @flow */

import * as React from 'react';

import Loader from '../utilities/Loader';
import StaticBlock from '../StaticBlock';
import { ContentfulEntryJson } from '../../types';
import PollLocator from '../PollLocator/PollLocator';
import SoftEdgeBlock from '../actions/SoftEdgeBlock';
import CallToAction from '../CallToAction/CallToAction';
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
  classNameByEntry: Object,
  classNameByEntryDefault: String,
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
    const {
      json = DEFAULT_BLOCK,
      className = null,
      classNameByEntry = {},
      classNameByEntryDefault = null,
    } = this.props;
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
            author={
              json.fields && json.fields.author
                ? json.fields.author.fields
                : undefined
            }
            onClose={json.onClose}
          />
        );

      // @TODO: Need to figure out 'onClose'...
      case 'AffirmationBlock':
        return (
          <AffirmationContainer
            userId={window.AUTH.id}
            {...withoutNulls(json)}
          />
        );

      case 'CallToActionBlock':
        return (
          <CallToAction
            actionText={json.actionText}
            content={json.content}
            impactPrefix={json.impactPrefix}
            impactSuffix={json.impactSuffix}
            impactValue={json.impactValue}
            visualStyle={json.visualStyle.toLowerCase()}
            useCampaignTagline={json.useCampaignTagline}
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

      case 'CampaignUpdateBlock':
        return (
          <CampaignUpdateContainer
            id={json.id}
            affiliateLogo={json.affiliateLogo}
            author={json.author}
            content={json.content}
            link={json.link}
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
        return (
          <ContentBlock
            className={className}
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'ContentBlock':
        return (
          <ContentBlock
            className={className}
            // Resolves the aliases used in the ContentBlockFragment.
            content={json.contentBlockContent}
            imageAlignment={json.contentBlockImageAlignment}
            {...withoutNulls(json)}
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
        return <GalleryBlock {...withoutNulls(json.fields)} />;

      case 'GalleryBlock':
        return <GalleryBlock {...withoutNulls(json)} />;

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
              className="photo-submission-user-gallery mt-3"
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
              className="photo-submission-user-gallery mt-3"
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

      case 'sectionBlock': {
        return (
          <SectionBlock
            className={className}
            classNameByEntry={classNameByEntry}
            classNameByEntryDefault={classNameByEntryDefault}
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

      case 'SelectionSubmissionBlock':
        return <SelectionSubmissionActionContainer {...withoutNulls(json)} />;

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

      case 'SocialDriveBlock':
        return <SocialDriveActionContainer {...json} />;

      case 'socialDriveAction':
        return <SocialDriveActionContainer {...json.fields} />;

      case 'SoftEdgeBlock':
        return <SoftEdgeBlock {...json} />;

      case 'softEdgeWidgetAction':
        return <SoftEdgeBlock {...json.fields} />;

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
              className="text-submission-user-gallery mt-3"
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
              className="text-submission-user-gallery mt-3"
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
        return (
          <ErrorBlock error={`ContentfulEntry is unable to render ${type}.`} />
        );
    }
  }
}

export default ContentfulEntry;

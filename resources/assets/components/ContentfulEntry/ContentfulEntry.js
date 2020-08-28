import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../utilities/Loader';
import SoftEdgeBlock from '../actions/SoftEdgeBlock';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';
import LandingPage from '../pages/LandingPage/LandingPage';
import ImagesBlock from '../blocks/ImagesBlock/ImagesBlock';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import GalleryBlock from '../blocks/GalleryBlock/GalleryBlock';
import SectionBlock from '../blocks/SectionBlock/SectionBlock';
import CampaignUpdate from '../blocks/CampaignUpdate/CampaignUpdate';
import AffirmationContainer from '../Affirmation/AffirmationContainer';
import { parseContentfulType, report, withoutNulls } from '../../helpers';
import ActionStatsBlock from '../blocks/ActionStatsBlock/ActionStatsBlock';
import EmbedBlockContainer from '../blocks/EmbedBlock/EmbedBlockContainer';
import LinkActionContainer from '../actions/LinkAction/LinkActionContainer';
import CallToActionBlock from '../blocks/CallToActionBlock/CallToActionBlock';
import ShareActionContainer from '../actions/ShareAction/ShareActionContainer';
import CampaignDashboard from '../utilities/CampaignDashboard/CampaignDashboard';
import SixpackExperiment from '../utilities/SixpackExperiment/SixpackExperiment';
import PostGalleryBlockQuery from '../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import SignupReferralsBlock from '../blocks/SignupReferralsBlock/SignupReferralsBlock';
import SocialDriveActionContainer from '../actions/SocialDriveAction/SocialDriveActionContainer';
import CurrentSchoolBlockContainer from '../blocks/CurrentSchoolBlock/CurrentSchoolBlockContainer';
import TextSubmissionActionContainer from '../actions/TextSubmissionAction/TextSubmissionActionContainer';
import PhotoSubmissionActionContainer from '../actions/PhotoSubmissionAction/PhotoSubmissionActionContainer';
import SubmissionGalleryBlockContainer from '../blocks/SubmissionGalleryBlock/SubmissionGalleryBlockContainer';
import VoterRegistrationDriveAction from '../actions/VoterRegistrationDriveAction/VoterRegistrationDriveAction';
import VoterRegistrationActionContainer from '../actions/VoterRegistrationAction/VoterRegistrationActionContainer';
import PetitionSubmissionActionContainer from '../actions/PetitionSubmissioncAction/PetitionSubmissionActionContainer';
import VoterRegistrationReferralsBlock from '../blocks/VoterRegistrationReferralsBlock/VoterRegistrationReferralsBlock';
import SelectionSubmissionActionContainer from '../actions/SelectionSubmissionAction/SelectionSubmissionActionContainer';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK = { fields: { type: null } };

class ContentfulEntry extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
    report(error);
  }

  render() {
    // Did we hit an error? :(
    if (this.state.error) {
      return <ErrorBlock error={this.state.error} />;
    }

    // Otherwise, find the corresponding component & render it!
    const {
      json = DEFAULT_BLOCK,
      className = null,
      classNameByEntry = {},
      classNameByEntryDefault = null,
      ...additionalCustomProps
    } = this.props;
    const type = parseContentfulType(json);

    switch (type) {
      case 'ActionStatsBlock':
        return <ActionStatsBlock {...withoutNulls(json)} />;

      case 'AffirmationBlock':
        return (
          <AffirmationContainer
            userId={window.AUTH.id}
            {...withoutNulls(json)}
          />
        );

      case 'callToAction':
      case 'CallToActionBlock':
        return <CallToActionBlock {...withoutNulls(json)} />;

      // Note: This is loaded via legacy PHP Content API.
      case 'campaignDashboard':
        return <CampaignDashboard {...withoutNulls(json.fields)} />;

      case 'CampaignDashboard':
        return <CampaignDashboard {...withoutNulls(json)} />;

      case 'CampaignUpdateBlock':
        return (
          <CampaignUpdate
            id={json.id}
            affiliateLogo={json.affiliateLogo}
            author={json.author}
            content={json.content}
            link={json.link}
          />
        );

      case 'ContentBlock':
        return (
          <ContentBlock
            {...withoutNulls({
              ...json,
              // Resolves the aliases used in the ContentBlockFragment.
              content: json.contentBlockContent,
              imageAlignment: json.contentBlockImageAlignment,
            })}
            {...additionalCustomProps}
          />
        );

      case 'CurrentSchoolBlock':
        return <CurrentSchoolBlockContainer {...withoutNulls(json)} />;

      case 'EmbedBlock':
        return (
          <EmbedBlockContainer
            className={className}
            id={json.id}
            {...withoutNulls(json)}
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

      case 'GalleryBlock':
        return <GalleryBlock {...withoutNulls(json)} />;

      case 'ImagesBlock':
        return <ImagesBlock className={className} images={json.images} />;

      // Note: This is loaded via legacy PHP Content API.
      case 'landingPage':
        return <LandingPage {...json.fields} />;

      case 'LinkBlock':
        return (
          <LinkActionContainer
            {...withoutNulls({
              ...json,
              // Resolves the aliases used in the LinkBlockFragment.
              title: json.linkBlockTitle,
              link: json.linkBlockLink,
            })}
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

      case 'QuizBlock': {
        const QuizBlock = Loader(import('../Quiz/QuizBlock'));
        return <QuizBlock {...json} />;
      }

      // Note: This is loaded via legacy PHP Content API.
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

      case 'SelectionSubmissionBlock':
        return <SelectionSubmissionActionContainer {...withoutNulls(json)} />;

      case 'ShareBlock':
        return <ShareActionContainer id={json.id} {...withoutNulls(json)} />;

      case 'SignupReferralsBlock':
        return <SignupReferralsBlock {...withoutNulls(json)} />;

      case 'SixpackExperimentBlock':
        return <SixpackExperiment id={json.id} {...withoutNulls(json)} />;

      case 'sixpackExperiment':
        return (
          <SixpackExperiment id={json.id} {...withoutNulls(json.fields)} />
        );

      case 'SocialDriveBlock':
        return <SocialDriveActionContainer {...json} />;

      case 'SoftEdgeBlock':
        return <SoftEdgeBlock {...json} />;

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

      case 'VoterRegistrationBlock':
        return <VoterRegistrationActionContainer blockId={json.id} {...json} />;

      case 'VoterRegistrationDriveBlock':
        return <VoterRegistrationDriveAction {...json} />;

      case 'VoterRegistrationReferralsBlock':
        return <VoterRegistrationReferralsBlock {...json} />;

      default:
        return (
          <ErrorBlock error={`ContentfulEntry is unable to render ${type}.`} />
        );
    }
  }
}

ContentfulEntry.propTypes = {
  json: PropTypes.object, // eslint-disable-line
  className: PropTypes.string,
  classNameByEntry: PropTypes.object, // eslint-disable-line
  classNameByEntryDefault: PropTypes.string,
};

ContentfulEntry.defaultProps = {
  className: null,
  classNameByEntry: null,
  classNameByEntryDefault: null,
};

export default ContentfulEntry;

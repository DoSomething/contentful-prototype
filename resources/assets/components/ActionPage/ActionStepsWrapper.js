import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import ActionStep from './ActionStep';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import { makeHash } from '../../helpers';
import CompetitionContainer from '../../containers/CompetitionContainer';
import { ReportbackUploaderContainer } from '../ReportbackUploader';
import { SubmissionGalleryContainer } from '../Gallery';
import { clickedSignUp as clickedSignUpAction } from '../../actions';

const ActionStepsWrapper = (props) => {
  const { actionSteps, callToAction, campaignId, clickedSignUp,
    hasPendingSignup, isAuthenticated, isSignedUp } = props;

  const photoUploader = (
    <FlexCell key="reportback_uploader" width="full">
      <ReportbackUploaderContainer />
    </FlexCell>
  );

  const submissionGallery = (
    <FlexCell key="submission_gallery" width="full">
      <SubmissionGalleryContainer />
    </FlexCell>
  );

  const actionRevealer = (
    <Revealer
      key="revealer"
      title="Join Us"
      callToAction={callToAction}
      isLoading={hasPendingSignup}
      onReveal={() => clickedSignUp(campaignId, { source: 'action page revealer' })}
      isAuthenticated={isAuthenticated}
    />
  );

  const renderPhotoUploader = isSignedUp ? photoUploader : actionRevealer;
  const renderSubmissionGallery = isSignedUp ? submissionGallery : null;

  let stepIndex = 0;

  const stepComponents = actionSteps.map((step) => {
    const type = step.customType || 'default';
    const title = step.title;
    const content = step.content || null;
    const key = makeHash(title);

    switch (type) {
      case 'competition':
        return (
          <CompetitionContainer
            key={key}
            content={content}
            photo={step.photos[0]}
            byline={step.additionalContent}
          />
        );

      case 'photo-uploader':
        return (renderPhotoUploader);

      case 'submission-gallery':
        return (renderSubmissionGallery);

      default:
        stepIndex += 1;

        return (
          <ActionStep
            key={key}
            title={title}
            content={content}
            stepIndex={stepIndex}
            background={step.background}
            photos={step.photos}
            photoWidth={step.displayOptions === 'full' ? 'full' : 'one-third'}
            shouldTruncate={step.truncate}
          />
        );
    }
  });

  if (! get(props.featureFlags, 'useComponentActions')) {
    stepComponents.push(renderSubmissionGallery);
  }

  return (
    <Flex>
      { stepComponents }
    </Flex>
  );
};

ActionStepsWrapper.propTypes = {
  actionSteps: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  callToAction: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  featureFlags: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  hasPendingSignup: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

ActionStepsWrapper.defaultProps = {
  featureFlags: null,
};

ActionStepsWrapper.mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
  callToAction: state.campaign.callToAction,
  hasPendingSignup: state.signups.isPending,
  isSignedUp: state.signups.thisCampaign,
  isAuthenticated: state.user.id !== null,
});

ActionStepsWrapper.actionCreators = {
  clickedSignUp: clickedSignUpAction,
};

export default connect(
  ActionStepsWrapper.mapStateToProps,
  ActionStepsWrapper.actionCreators,
)(ActionStepsWrapper);

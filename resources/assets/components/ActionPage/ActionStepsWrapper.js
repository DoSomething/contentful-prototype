import React from 'react';
import PropTypes from 'prop-types';

import ActionStep from './ActionStep';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import { PostGalleryContainer } from '../Gallery/PostGallery';
import { ThirdPartyActionContainer } from '../Actions/ThirdPartyAction';
import { ReportbackUploaderContainer } from '../ReportbackUploader';
import { CompetitionBlockContainer } from '../CompetitionBlock';
import { SubmissionGalleryContainer } from '../Gallery/SubmissionGallery';

const ActionStepsWrapper = (props) => {
  const { actionSteps, callToAction, campaignId, clickedSignUp,
    hasPendingSignup, isSignedUp, template } = props;

  const renderPhotoUploader = photoUploaderProps => (
    <FlexCell key="reportback_uploader" width="full">
      <ReportbackUploaderContainer {...photoUploaderProps} />
    </FlexCell>
  );

  const postGallery = (
    <PostGalleryContainer key="post_gallery" type="reportback" />
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
      isSignedUp={isSignedUp}
    />
  );

  let stepIndex = 0;

  const stepComponents = actionSteps.map((step) => {
    const type = step.fields.customType || 'default';
    const title = step.fields.title;
    const content = step.fields.content || null;
    const hideStepNumber = step.fields.hideStepNumber || false;
    const additionalContent = step.fields.additionalContent || {};
    const key = step.id;

    switch (type) {
      case 'competition':
        return (
          <CompetitionBlockContainer
            key={key}
            content={content}
            photo={step.fields.photos[0]}
            byline={additionalContent}
          />
        );

      case 'photo-uploader':
        return isSignedUp ? renderPhotoUploader({
          quantityOverride: additionalContent.quantityOverride || null,
        }) : null;

      case 'submission-gallery':
        return isSignedUp ? submissionGallery : null;

      case 'third-party-action':
        stepIndex += 1;

        return (
          <ThirdPartyActionContainer
            key={key}
            title={title}
            template="legacy"
            content={content}
            stepIndex={stepIndex}
            dynamicLink={additionalContent.dynamicLink || null}
            hideStepNumber={hideStepNumber}
            dynamicUrlParams={additionalContent.dynamicUrlParams || null}
          />
        );

      default:
        stepIndex += 1;

        return (
          <ActionStep
            key={key}
            title={title}
            content={content}
            stepIndex={stepIndex}
            background={step.fields.background}
            photos={step.fields.photos}
            photoWidth={step.fields.displayOptions === 'full' ? 'full' : 'one-third'}
            hideStepNumber={hideStepNumber}
            shouldTruncate={step.fields.truncate}
            template={template}
          />
        );
    }
  });

  if (! isSignedUp) {
    stepComponents.push(actionRevealer);
  }

  if (template === 'legacy') {
    stepComponents.push(
      <div key="member_gallery" className="action-step">
        <div className="margin-top-xlg margin-bottom-xlg margin-horizontal-md">
          <h2 className="heading -emphasized legacy-step-header margin-top-md margin-bottom-md">
            <span>Member Gallery</span>
          </h2>
          {postGallery}
        </div>
      </div>,
    );
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
  hasPendingSignup: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  template: PropTypes.string.isRequired,
};

export default ActionStepsWrapper;

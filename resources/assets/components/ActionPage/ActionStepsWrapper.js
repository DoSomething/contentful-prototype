import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import ActionStep from './ActionStep';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import { makeHash } from '../../helpers';
import CompetitionContainer from '../../containers/CompetitionContainer';
import { ReportbackUploaderContainer } from '../ReportbackUploader';
import { SubmissionGalleryContainer } from '../Gallery';

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
        return isSignedUp ? photoUploader : null;

      case 'submission-gallery':
        return isSignedUp ? submissionGallery : null;

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

  if (! isSignedUp) {
    stepComponents.push(actionRevealer);
  }

  if (isSignedUp && ! get(props.featureFlags, 'useComponentActions')) {
    stepComponents.push(submissionGallery);
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

export default ActionStepsWrapper;

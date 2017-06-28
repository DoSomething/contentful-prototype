import React from 'react';

import ActionStep from './ActionStep';
import Revealer from '../Revealer';
import { FlexCell } from '../Flex';
import { makeHash } from '../../helpers';
import CompetitionContainer from '../../containers/CompetitionContainer';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';

/**
 * Render a photo on the action page.
 */
export const renderPhoto = (photo, index) => (
  <div className="action-step__photo" key={index}>
    <img src={photo} alt="action step example" />
  </div>
);

/**
 * Render a single step on the action page.
 */
export const renderSteps = (steps, props) => {
  const { isAuthenticated, clickedSignUp } = props;

  const uploader = (
    <FlexCell key="reportback_uploader" width="full">
      <ReportbackUploaderContainer />
    </FlexCell>
  );

  const actionRevealer = (
    <Revealer
      key="revealer"
      title="Join Us"
      callToAction={props.callToAction}
      isLoading={props.hasPendingSignup}
      onReveal={() => clickedSignUp(props.campaignId, { source: 'action page revealer' })}
      isAuthenticated={isAuthenticated}
    />
  );

  const revealerOrUploader = isAuthenticated ? uploader : actionRevealer;

  let stepIndex = 0;
  let appendUploader = true; // TODO: Remove this after content updates.

  const stepComponents = steps.map((step) => {
    const title = step.title;
    const type = step.customType[0] || 'default';

    const sharedProps = {
      content: step.content,
      key: makeHash(title),
    };

    switch (type) {
      case 'competition':
        return (
          <CompetitionContainer
            {...sharedProps}
            photo={step.photos[0]}
            byline={step.additionalContent}
          />
        );

      case 'photo-uploader':
        appendUploader = false; // TODO: Remove this flag after content updates post deploy.
        return revealerOrUploader;

      default:
        stepIndex += 1;

        return (
          <ActionStep
            {...sharedProps}
            title={title}
            stepIndex={stepIndex}
            background={step.background}
            photos={step.photos}
            photoWidth={step.displayOptions[0] === 'full' ? 'full' : 'one-third'}
            shouldTruncate={step.shouldTruncate}
          />
        );
    }
  });

  // TODO: Remove this conditional post deploy / content updates.
  if (appendUploader) {
    stepComponents.push(revealerOrUploader);
  }

  return stepComponents;
};

import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Flex } from '../Flex';
import SectionHeader from '../SectionHeader';
import {
  renderCompetitionStep, renderPhotoUploader, renderSubmissionGallery,
  renderThirdPartyAction, renderActionStep, renderRevealer,
  renderLegacyGallery, renderVoterRegistrationAction, renderShareAction,
  renderLinkAction, renderAffirmation,
} from './ActionStepRenderers';

export const ActionStepBlock = ({ step, stepIndex = 0, isSignedUp = false }) => {
  const type = get(step, 'fields.customType', false) || get(step, 'type.sys.id', false) || 'default';

  switch (type) {
    case 'affirmation':
      return renderAffirmation(step);

    case 'competition':
      return renderCompetitionStep(step);

    case 'photoUploaderAction':
    case 'photo-uploader':
      return renderPhotoUploader(step, isSignedUp);

    case 'submission-gallery':
      return renderSubmissionGallery(isSignedUp);

    case 'third-party-action':
      return renderThirdPartyAction(step, stepIndex);

    case 'voterRegistrationAction':
      return renderVoterRegistrationAction(step, stepIndex);

    case 'shareAction':
      return renderShareAction(step);

    case 'linkAction':
      return renderLinkAction(step);

    default:
      return renderActionStep(step, stepIndex);
  }
};

const ActionStepsWrapper = (props) => {
  const { actionSteps, callToAction, campaignId,
    hasActivityFeed, hasPendingSignup, isSignedUp, template } = props;

  let stepIndex = 0;

  const stepComponents = actionSteps.map((step) => {
    const type = get(step, 'fields.customType', false) || get(step, 'type.sys.id', false) || 'default';

    // Is this a "numbered" step? If so, increment our step index.
    if (['third-party-action', 'campaignActionStep', 'default'].includes(type)) {
      stepIndex += 1;
    }

    // Some components have built-in section headers. For those, append it.
    // @TODO: These should be split out into separate "content" blocks.
    let prefixComponent = null;
    if (['voterRegistrationAction'].includes(type)) {
      const title = get(step, 'fields.title');

      prefixComponent = title ? (
        <SectionHeader
          title={title}
          hideStepNumber={get(step, 'fields.hideStepNumber', true)}
          step={stepIndex}
        />
      ) : null;
    }

    return (
      <div>
        {prefixComponent}
        <ActionStepBlock step={step} stepIndex={stepIndex} isSignedUp={isSignedUp} />
      </div>
    );
  });

  if (! isSignedUp) {
    stepComponents.push(renderRevealer(
      callToAction, hasPendingSignup, isSignedUp, campaignId,
    ));
  }

  if (template === 'legacy' || ! hasActivityFeed) {
    stepComponents.push(renderLegacyGallery());
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
  hasActivityFeed: PropTypes.bool.isRequired,
  hasPendingSignup: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  template: PropTypes.string.isRequired,
};

export default ActionStepsWrapper;

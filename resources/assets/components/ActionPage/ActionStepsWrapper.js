import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Flex } from '../Flex';
import {
  renderCompetitionStep, renderPhotoUploader, renderSubmissionGallery,
  renderThirdPartyAction, renderActionStep, renderRevealer,
  renderLegacyGallery, renderVoterRegistration,
} from './ActionStepRenderers';

const ActionStepsWrapper = (props) => {
  const { actionSteps, callToAction, campaignId,
    hasPendingSignup, isSignedUp, template } = props;

  let stepIndex = 0;

  const stepComponents = actionSteps.map((step) => {
    const type = get(step, 'fields.customType', false) || get(step, 'type.sys.id', false) || 'default';

    switch (type) {
      case 'competition':
        return renderCompetitionStep(step);

      case 'photoUploaderAction':
      case 'photo-uploader':
        return renderPhotoUploader(step, isSignedUp);

      case 'submission-gallery':
        return renderSubmissionGallery(isSignedUp);

      case 'third-party-action':
        stepIndex += 1;
        return renderThirdPartyAction(step, stepIndex);

      case 'voterRegistrationAction':
        return renderVoterRegistration(step, stepIndex);

      default:
        stepIndex += 1;
        return renderActionStep(step, stepIndex, template);
    }
  });

  if (! isSignedUp) {
    stepComponents.push(renderRevealer(
      callToAction, hasPendingSignup, isSignedUp, campaignId,
    ));
  }

  if (template === 'legacy') {
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
  hasPendingSignup: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  template: PropTypes.string.isRequired,
};

export default ActionStepsWrapper;

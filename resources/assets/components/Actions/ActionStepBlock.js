import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  renderCompetitionStep, renderPhotoUploader, renderSubmissionGallery,
  renderThirdPartyAction, renderContentBlock, renderVoterRegistrationAction,
  renderShareAction, renderLinkAction, renderAffirmation,
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
      return renderContentBlock(step, stepIndex);
  }
};

ActionStepBlock.propTypes = {
  step: PropTypes.object.isRequired, // eslint-disable-line
  stepIndex: PropTypes.number,
  isSignedUp: PropTypes.bool.isRequired,
};

ActionStepBlock.defaultProps = {
  stepIndex: 0,
};

export default ActionStepBlock;

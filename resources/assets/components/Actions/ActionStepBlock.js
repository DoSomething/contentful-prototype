import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  renderCompetitionStep, renderPhotoUploader, renderSubmissionGallery,
  renderThirdPartyAction, renderContentBlock, renderVoterRegistrationAction,
  renderShareAction, renderLinkAction, renderAffirmation,
} from './ActionStepRenderers';

export const ActionStepBlock = ({ json, stepIndex = 0, isSignedUp = false }) => {
  const type = get(json, 'fields.customType', false) || get(json, 'type.sys.id', false) || 'default';

  switch (type) {
    case 'affirmation':
      return renderAffirmation(json);

    case 'competition':
      return renderCompetitionStep(json);

    case 'photoUploaderAction':
    case 'photo-uploader':
      return renderPhotoUploader(json, isSignedUp);

    case 'submission-gallery':
      return renderSubmissionGallery(isSignedUp);

    case 'third-party-action':
      return renderThirdPartyAction(json, stepIndex);

    case 'voterRegistrationAction':
      return renderVoterRegistrationAction(json, stepIndex);

    case 'shareAction':
      return renderShareAction(json);

    case 'linkAction':
      return renderLinkAction(json);

    default:
      return renderContentBlock(json, stepIndex);
  }
};

ActionStepBlock.propTypes = {
  json: PropTypes.object.isRequired, // eslint-disable-line
  stepIndex: PropTypes.number,
  isSignedUp: PropTypes.bool.isRequired,
};

ActionStepBlock.defaultProps = {
  stepIndex: 0,
};

export default ActionStepBlock;

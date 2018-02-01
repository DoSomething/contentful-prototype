import React from 'react';
import PropTypes from 'prop-types';

import LegacyStepHeaderTemplate from './templates/LegacyStepHeaderTemplate';
import MosaicStepHeaderTemplate from './templates/MosaicStepHeaderTemplate';
import StepHeaderTemplate from './templates/StepHeaderTemplate';

const StepHeader = (props) => {
  switch (props.template) {
    case 'legacy':
      return (
        <LegacyStepHeaderTemplate {...props} />
      );
    case 'new-design':
      return (
        <StepHeaderTemplate {...props} />
      );
    default:
      return (
        <MosaicStepHeaderTemplate {...props} />
      );
  }
};

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  hideStepNumber: PropTypes.bool,
  background: PropTypes.string,
  template: PropTypes.string.isRequired,
};

StepHeader.defaultProps = {
  background: null,
  hideStepNumber: false,
};

export default StepHeader;

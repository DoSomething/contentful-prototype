import React from 'react';
import PropTypes from 'prop-types';

const LegacyStepHeaderTemplate = ({ title, step, hideStepNumber }) => (
  <h2 className="heading -emphasized legacy-step-header">
    <span>
      { hideStepNumber ? null : `Step ${step}: ` }
      {title}
    </span>
  </h2>
);

LegacyStepHeaderTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number,
  hideStepNumber: PropTypes.bool,
};

LegacyStepHeaderTemplate.defaultProps = {
  step: null,
  hideStepNumber: false,
};

export default LegacyStepHeaderTemplate;

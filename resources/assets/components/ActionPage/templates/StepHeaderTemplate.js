import React from 'react';
import PropTypes from 'prop-types';

import { convertNumberToWord } from '../../../helpers';

const StepHeaderTemplate = ({ preTitle, title, hideStepNumber, step }) => (
  <div className="flex__cell -two-thirds legacy-step-header">
    <span className="heading -emphasized step-header__pre-title">
      { hideStepNumber ? preTitle : `Step ${convertNumberToWord(step)}` }
    </span>
    <h1 className="step-header__title">{title}</h1>
  </div>
);

StepHeaderTemplate.propTypes = {
  preTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  step: PropTypes.number,
  hideStepNumber: PropTypes.bool,
};

StepHeaderTemplate.defaultProps = {
  step: null,
  preTitle: null,
  background: null,
  hideStepNumber: false,
};

export default StepHeaderTemplate;

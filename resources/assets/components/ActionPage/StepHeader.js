import React from 'react';
import PropTypes from 'prop-types';

import { FlexCell } from '../Flex';
import LazyImage from '../LazyImage';
import { convertNumberToWord } from '../../helpers';

const StepHeader = ({ title, step, background, hideStepNumber }) => (
  <FlexCell width="full">
    <div className="action-step__header">
      { background ? <LazyImage src={background} /> : null }
      { hideStepNumber ? null : <span>step { convertNumberToWord(step) }</span> }
      <h1>{ title }</h1>
    </div>
  </FlexCell>
);

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  hideStepNumber: PropTypes.bool.isRequired,
  background: PropTypes.string,
};

StepHeader.defaultProps = {
  background: null,
};

export default StepHeader;

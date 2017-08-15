import React from 'react';
import PropTypes from 'prop-types';

import { FlexCell } from '../Flex';
import PhotoHeader from '../PhotoHeader';
import { convertNumberToWord } from '../../helpers';

const StepHeader = ({ title, step, background, hideStepNumber }) => (
  <FlexCell width="full">
    <PhotoHeader backgroundImage={background}>
      <div className="action-step__header">
        { hideStepNumber ? null : <span>step { convertNumberToWord(step) }</span> }
        <h1>{ title }</h1>
      </div>
    </PhotoHeader>
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

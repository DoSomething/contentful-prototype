import React from 'react';
import PropTypes from 'prop-types';

import { FlexCell } from '../Flex';
import LazyImage from '../LazyImage';
import { convertNumberToWord } from '../../helpers';

const StepHeader = ({ title, step, background }) => (
  <FlexCell width="full">
    <div className="action-step__header">
      <LazyImage src={background} />
      <span>step { convertNumberToWord(step) }</span>
      <h1>{ title }</h1>
    </div>
  </FlexCell>
);

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired,
};

export default StepHeader;

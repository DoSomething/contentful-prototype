import React from 'react';
import PropTypes from 'prop-types';

import { convertNumberToWord } from '../../helpers';
import './section-header.scss';

const SectionHeader = ({ preTitle, title, hideStepNumber, step }) => (
  <div className="flex__cell -two-thirds section-header">
    <span className="heading -emphasized section-header__pre-title">
      {hideStepNumber ? preTitle : `Step ${convertNumberToWord(step)}`}
    </span>
    <h1 className="section-header__title">{title}</h1>
  </div>
);

SectionHeader.propTypes = {
  preTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  hideStepNumber: PropTypes.bool,
  step: PropTypes.number,
};

SectionHeader.defaultProps = {
  step: null,
  preTitle: null,
  hideStepNumber: false,
};

export default SectionHeader;

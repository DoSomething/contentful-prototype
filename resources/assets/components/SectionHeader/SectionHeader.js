import React from 'react';
import PropTypes from 'prop-types';

import { convertNumberToWord } from '../../helpers';
import './section-header.scss';

// @TODO:
// - change preTitle prop to superTitle,
// - remove hideStepNumber prop and associated logic

const SectionHeader = ({ preTitle, title, hideStepNumber, step }) => (
  <div className="flex__cell -two-thirds section-header">
    <span className="heading -emphasized section-header__pre-title">
      {hideStepNumber ? preTitle : `Step ${convertNumberToWord(step)}`}
    </span>
    {title ? <h1 className="section-header__title">{title}</h1> : null}
  </div>
);

SectionHeader.propTypes = {
  preTitle: PropTypes.string,
  title: PropTypes.string,
  hideStepNumber: PropTypes.bool,
  step: PropTypes.number,
};

SectionHeader.defaultProps = {
  step: null,
  title: null,
  preTitle: null,
  hideStepNumber: false,
};

export default SectionHeader;

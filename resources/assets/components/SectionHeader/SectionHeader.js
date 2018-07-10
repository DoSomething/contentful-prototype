import React from 'react';
import PropTypes from 'prop-types';

import { convertNumberToWord } from '../../helpers';
import './section-header.scss';

// @TODO: change preTitle prop to superTitle.

const SectionHeader = ({ preTitle, title }) => (
  <div className="flex__cell -two-thirds section-header">
    <span className="heading -emphasized section-header__pre-title">
      {preTitle}
    </span>
    {title ? <h1 className="section-header__title">{title}</h1> : null}
  </div>
);

SectionHeader.propTypes = {
  preTitle: PropTypes.string,
  title: PropTypes.string,
};

SectionHeader.defaultProps = {
  title: null,
  preTitle: null,
};

export default SectionHeader;

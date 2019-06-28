import React from 'react';
import PropTypes from 'prop-types';

import './section-header.scss';

// @TODO: change preTitle prop to superTitle.

const SectionHeader = ({ preTitle, title }) => (
  <div className="flex__cell -two-thirds section-header">
    {preTitle != null ? (
      <span className="heading -emphasized section-header__pre-title">
        {preTitle}
      </span>
    ) : null}

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

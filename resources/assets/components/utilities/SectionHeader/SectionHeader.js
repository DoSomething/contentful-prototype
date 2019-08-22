import React from 'react';
import PropTypes from 'prop-types';

import './section-header.scss';

const SectionHeader = ({ superTitle, title }) => (
  <div className="flex__cell -two-thirds section-header">
    {superTitle ? (
      <span className="heading -emphasized section-header__super-title">
        {superTitle}
      </span>
    ) : null}

    {title ? <h1 className="section-header__title">{title}</h1> : null}
  </div>
);

SectionHeader.propTypes = {
  superTitle: PropTypes.string,
  title: PropTypes.string,
};

SectionHeader.defaultProps = {
  title: null,
  superTitle: null,
};

export default SectionHeader;

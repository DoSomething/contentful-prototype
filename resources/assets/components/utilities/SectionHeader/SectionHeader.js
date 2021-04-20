import React from 'react';
import PropTypes from 'prop-types';

import './section-header.scss';

const SectionHeader = ({ superTitle, title }) => (
  <div className="flex__cell -two-thirds section-header w-full">
    {superTitle ? (
      <span className="font-bold uppercase text-m text-purple-400">
        {superTitle}
      </span>
    ) : null}

    {title ? (
      <h1 className="section-header__title font-normal font-league-gothic uppercase text-4xl">
        <span>{title}</span>
      </h1>
    ) : null}
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

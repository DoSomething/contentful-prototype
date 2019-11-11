import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './section-header.scss';

const SectionHeader = ({ superTitle, title, underlined }) => (
  <div className="flex__cell -two-thirds section-header w-full">
    {superTitle ? (
      <span className="font-bold uppercase text-m text-gray-700">
        {superTitle}
      </span>
    ) : null}

    {title ? (
      <h1
        className={classNames(
          'section-header__title font-normal font-secondary uppercase text-xxl',
          {
            '-underlined pb-4': underlined,
          },
        )}
      >
        <span>{title}</span>
      </h1>
    ) : null}
  </div>
);

SectionHeader.propTypes = {
  superTitle: PropTypes.string,
  title: PropTypes.string,
  underlined: PropTypes.bool,
};

SectionHeader.defaultProps = {
  title: null,
  superTitle: null,
  underlined: false,
};

export default SectionHeader;

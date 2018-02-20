import React from 'react';
import PropTypes from 'prop-types';

import LegacyTemplate from './templates/LegacyTemplate';
import MosaicTemplate from './templates/MosaicTemplate';
import CoverTemplate from './templates/CoverTemplate';

import './lede-banner.scss';

const LedeBanner = (props) => {
  const { template } = props;

  switch (template) {
    case 'legacy':
      return <LegacyTemplate {...props} />;

    case 'cover':
      return <CoverTemplate {...props} />;

    default:
      return <MosaicTemplate {...props} />;
  }
};

LedeBanner.propTypes = {
  template: PropTypes.string.isRequired,
};


export default LedeBanner;

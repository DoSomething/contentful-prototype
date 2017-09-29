import React from 'react';
import PropTypes from 'prop-types';

import LegacyTemplate from './templates/LegacyTemplate';
import MosaicTemplate from './templates/MosaicTemplate';

import './lede-banner.scss';

const LedeBanner = (props) => {
  const { template } = props;

  switch (template) {
    case 'legacy':
      return <LegacyTemplate {...props} />;

    default:
      return <MosaicTemplate {...props} />;
  }
};

LedeBanner.propTypes = {
  template: PropTypes.string.isRequired,
};


export default LedeBanner;

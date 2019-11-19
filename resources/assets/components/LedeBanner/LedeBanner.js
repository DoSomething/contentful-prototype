import React from 'react';
import PropTypes from 'prop-types';

import CoverTemplate from './templates/CoverTemplate';
import JumboTemplate from './templates/JumboTemplate';
import MosaicTemplate from './templates/MosaicTemplate';
import MarqueeTemplate from '../pages/LandingPage/templates/MarqueeTemplate';

const LedeBanner = props => {
  const { template, useLegacyTemplate } = props;

  switch (template) {
    case 'cover':
      return <CoverTemplate {...props} />;

    case 'jumbo':
      return <JumboTemplate {...props} />;

    default:
      return useLegacyTemplate ? (
        <MosaicTemplate {...props} />
      ) : (
        <MarqueeTemplate {...props} />
      );
  }
};

LedeBanner.propTypes = {
  template: PropTypes.string.isRequired,
  useLegacyTemplate: PropTypes.bool,
};

LedeBanner.defaultProps = {
  useLegacyTemplate: false,
};

export default LedeBanner;

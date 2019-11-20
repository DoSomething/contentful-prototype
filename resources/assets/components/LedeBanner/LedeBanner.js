import React from 'react';
import PropTypes from 'prop-types';

import CoverTemplate from './templates/CoverTemplate';
import JumboTemplate from './templates/JumboTemplate';
import MosaicTemplate from './templates/MosaicTemplate';
import MarqueeTemplate from '../pages/LandingPage/templates/MarqueeTemplate';

const LedeBanner = props => {
  const { template, featureFlagUseLegacyTemplate } = props;

  switch (template) {
    case 'cover':
      return <CoverTemplate {...props} />;

    case 'jumbo':
      return <JumboTemplate {...props} />;

    default:
      // @TODO: uncomment this toggle logic once we're clear to deploy this work!
      // return featureFlagUseLegacyTemplate ? (
      return <MosaicTemplate {...props} />;
    // ) : (
    // <MarqueeTemplate {...props} />
    // );
  }
};

LedeBanner.propTypes = {
  featureFlagUseLegacyTemplate: PropTypes.bool,
  template: PropTypes.string.isRequired,
};

LedeBanner.defaultProps = {
  featureFlagUseLegacyTemplate: false,
};

export default LedeBanner;

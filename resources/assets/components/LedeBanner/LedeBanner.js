import React from 'react';
import PropTypes from 'prop-types';

import CoverTemplate from './templates/CoverTemplate';
import JumboTemplate from './templates/JumboTemplate';
import MosaicTemplate from './templates/MosaicTemplate';
import MarqueeTemplate from './templates/MarqueeTemplate';

const LedeBanner = props => {
  const { template, featureFlagUseLegacyTemplate } = props;

  switch (template) {
    case 'cover':
      return <CoverTemplate {...props} />;

    case 'jumbo':
      return <JumboTemplate {...props} />;

    default:
      return featureFlagUseLegacyTemplate ? (
        <MosaicTemplate {...props} />
      ) : (
        <MarqueeTemplate {...props} />
      );
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

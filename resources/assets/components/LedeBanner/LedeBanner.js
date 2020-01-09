import React from 'react';
import PropTypes from 'prop-types';

import MosaicTemplate from './templates/MosaicTemplate';
import HeroTemplate from './templates/HeroTemplate';

const LedeBanner = props => {
  const { featureFlagUseLegacyTemplate } = props;

  return featureFlagUseLegacyTemplate ? (
    <MosaicTemplate {...props} />
  ) : (
    <HeroTemplate {...props} />
  );
};

LedeBanner.propTypes = {
  featureFlagUseLegacyTemplate: PropTypes.bool,
};

LedeBanner.defaultProps = {
  featureFlagUseLegacyTemplate: false,
};

export default LedeBanner;

import React from 'react';
import PropTypes from 'prop-types';

import CoverTemplate from './templates/CoverTemplate';
import JumboTemplate from './templates/JumboTemplate';
import MarqueeTemplate from '../pages/LandingPage/templates/MarqueeTemplate';

const LedeBanner = props => {
  const { template } = props;

  switch (template) {
    case 'cover':
      return <CoverTemplate {...props} />;

    case 'jumbo':
      return <JumboTemplate {...props} />;

    default:
      return <MarqueeTemplate {...props} />;
  }
};

LedeBanner.propTypes = {
  template: PropTypes.string.isRequired,
};

export default LedeBanner;

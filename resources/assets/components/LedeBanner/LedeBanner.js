import React from 'react';
import PropTypes from 'prop-types';

import CoverTemplate from './templates/CoverTemplate';
import JumboTemplate from './templates/JumboTemplate';
import MosaicTemplate from './templates/MosaicTemplate';

const LedeBanner = props => {
  const { template } = props;

  switch (template) {
    case 'cover':
      return <CoverTemplate {...props} />;

    case 'jumbo':
      return <JumboTemplate {...props} />;

    default:
      return <MosaicTemplate {...props} />;
  }
};

LedeBanner.propTypes = {
  template: PropTypes.string.isRequired,
};

export default LedeBanner;

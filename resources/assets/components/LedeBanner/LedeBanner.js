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

// questions that i have so far:
// is the join now button always included in the banner?
// can this check be done before the template level for all Lede Banners?
// is the lede banner always used in every campaign?

// things to try tomorrow
// setting isCampaignClosed on proprs for the LedeBanner
// making sure it's accessible in all templates for lede banner
// refactoring the button checks to include a check for inCampaignClosed
// first just hide the button
// refactor to instead display a Message that the campaign is currently closed (get from PM)
// ask about whether this is a case for all templates or just for the default (i assume it is the case for all)

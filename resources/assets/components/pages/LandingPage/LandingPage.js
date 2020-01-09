/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';

const LandingPage = props => {
  const { isCampaignClosed } = props;

  return <LedeBannerContainer isClosed={isCampaignClosed} />;
};

LandingPage.propTypes = {
  isCampaignClosed: PropTypes.bool,
};

LandingPage.defaultProps = {
  isCampaignClosed: false,
};

export default LandingPage;

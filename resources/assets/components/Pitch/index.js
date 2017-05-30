import React from 'react';
import PropTypes from 'prop-types';

import PitchSincerelyUs from './PitchCampaigns/SincerelyUs';

const Pitch = ({ campaignId }) => {
  if (campaignId !== '7656') return null;

  return (<PitchSincerelyUs />);
};

Pitch.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default Pitch;

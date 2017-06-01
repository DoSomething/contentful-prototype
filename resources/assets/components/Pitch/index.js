import React from 'react';
import PropTypes from 'prop-types';

import PitchSincerelyUs from './PitchCampaigns/SincerelyUs';

const Pitch = (props) => {
  if (props.campaignId !== '7656') return null;

  return (<PitchSincerelyUs {...props} />);
};

Pitch.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

export default Pitch;

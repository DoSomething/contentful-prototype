import React from 'react';
import PropTypes from 'prop-types';

import PitchSincerelyUs from './PitchCampaigns/SincerelyUs';

const Pitch = (props) => {
  if (! props.enableBackgroundTest) return null;

  return (<PitchSincerelyUs {...props} />);
};

Pitch.propTypes = {
  enableBackgroundTest: PropTypes.bool.isRequired,
};

export default Pitch;

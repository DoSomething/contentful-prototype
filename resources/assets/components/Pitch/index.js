import React from 'react';
import PropTypes from 'prop-types';

import PitchSincerelyUs from './PitchCampaigns/SincerelyUs';

const Pitch = (props) => {
  if (props.contentfulId !== '40rU2q930sWewsUGiuwyOk') return null;

  return (<PitchSincerelyUs {...props} />);
};

Pitch.propTypes = {
  contentfulId: PropTypes.string.isRequired,
};

export default Pitch;

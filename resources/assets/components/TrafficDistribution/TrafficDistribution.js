import React from 'react';
import PropTypes from 'prop-types';

import { get, set } from '../../helpers/storage';

const TrafficDistribution = ({ percentage, feature, children }) => {
  let shouldSeeFeature;

  const storedValue = get(feature, 'object');

  if (! storedValue) {
    shouldSeeFeature = (Math.random() * 100) <= percentage;

    set(feature, 'object', { showFeature: shouldSeeFeature });
  } else {
    shouldSeeFeature = storedValue.showFeature;
  }

  return (
    shouldSeeFeature ? <span>{ children }</span> : null
  );
};

TrafficDistribution.propTypes = {
  percentage: PropTypes.number.isRequired,
  feature: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TrafficDistribution;

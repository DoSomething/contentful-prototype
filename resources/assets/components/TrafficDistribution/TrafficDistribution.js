import React from 'react';
import PropTypes from 'prop-types';

import { get, set } from '../../helpers/storage';

const TrafficDistribution = ({ percentage, feature, children }) => {
  let shouldSeeFeature;

  const storedValue = get(`TrafficDistribution_${feature}`, 'object');

  if (! storedValue) {
    shouldSeeFeature = (Math.random() * 100) <= percentage;

    set(`TrafficDistribution_${feature}`, 'object', { showFeature: shouldSeeFeature });
  } else {
    shouldSeeFeature = storedValue.showFeature;
  }

  return (
    shouldSeeFeature ? <div>{ children }</div> : null
  );
};

TrafficDistribution.propTypes = {
  percentage: PropTypes.number.isRequired,
  feature: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TrafficDistribution;

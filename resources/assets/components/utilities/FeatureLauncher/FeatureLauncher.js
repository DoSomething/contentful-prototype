import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { isTimestampValid, env, query } from '../../../helpers';
import { get as getStorage, set as setStorage } from '../../../helpers/storage';

const FeatureLauncher = ({ type, render, countdown }) => {
  const [showFeature, setShowFeature] = useState(false);

  const shouldSeeFeature = () => {
    let shouldNotSee = getStorage(`hide_${type}`, 'boolean');
    // Support for legacy nps survey 'hide feature' storage format.
    if (type === 'nps_survey' && !shouldNotSee) {
      shouldNotSee = getStorage('finished_survey', 'boolean');
    }

    // Check if the survey was dismissed over 30 days ago.
    const dismissalTime = getStorage(`dismissed_${type}`, 'timestamp');
    const isDismissed = isTimestampValid(dismissalTime, 30 * 1440 * 60 * 1000);

    return (
      env(`${type.toUpperCase()}_ENABLED`) && !shouldNotSee && !isDismissed
    );
  };

  useEffect(() => {
    let timer = null;

    // Mark the feature as "hidden" in local storage if indicated by query param.
    if (query(`hide_${type}`) === '1') {
      setStorage(`hide_${type}`, 'boolean', true);
    }

    if (shouldSeeFeature()) {
      timer = setTimeout(() => {
        setShowFeature(true);
      }, countdown * 1000);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Mark this feature as "dismissed" in local storage & hide the feature.
    setStorage(`dismissed_${type}`, 'timestamp', Date.now());
    setShowFeature(false);
  };

  return showFeature ? render(handleClose) : null;
};

FeatureLauncher.propTypes = {
  type: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
};

export default FeatureLauncher;

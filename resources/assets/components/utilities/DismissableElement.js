import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { isTimestampValid, env, query } from '../../helpers';
import { get as getStorage, set as setStorage } from '../../helpers/storage';

const DismissableElement = ({ name, render }) => {
  const [showElement, setShowElement] = useState(true);

  useEffect(() => {
    // Mark the element as "hidden" in local storage if indicated by query param.
    if (query(`hide_${name}`) === '1') {
      setStorage(`hide_${name}`, 'boolean', true);
    }
  }, []);

  const shouldSeeElement = () => {
    let shouldNotSee = getStorage(`hide_${name}`, 'boolean');
    // Support for legacy nps survey 'hide element' storage format.
    if (name === 'nps_survey' && !shouldNotSee) {
      shouldNotSee = getStorage('finished_survey', 'boolean');
    }

    // Check if the survey was dismissed over 30 days ago.
    const dismissalTime = getStorage(`dismissed_${name}`, 'timestamp');
    const isDismissed = isTimestampValid(dismissalTime, 30 * 1440 * 60 * 1000);

    return (
      env(`${name.toUpperCase()}_ENABLED`) &&
      !shouldNotSee &&
      !isDismissed &&
      showElement
    );
  };

  const handleDismissal = () => {
    // Mark the element as "dismissed" in local storage & hide it.
    setStorage(`dismissed_${name}`, 'timestamp', Date.now());
    setShowElement(false);
  };

  return shouldSeeElement() ? render(handleDismissal) : null;
};

DismissableElement.propTypes = {
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default DismissableElement;

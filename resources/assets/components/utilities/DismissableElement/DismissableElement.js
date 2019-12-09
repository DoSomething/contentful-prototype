import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { isTimestampValid, query } from '../../../helpers';
import { get as getStorage, set as setStorage } from '../../../helpers/storage';

const DismissableElement = ({ name, render }) => {
  const [showElement, setShowElement] = useState(true);

  const handleCompletion = () => {
    // Mark the element as "hidden" in local storage.
    setStorage(`hide_${name}`, 'boolean', true);
  };

  const handleDismissal = () => {
    if (!getStorage(`hide_${name}`, 'boolean')) {
      // Mark the element as "dismissed" in local storage & hide it.
      setStorage(`dismissed_${name}`, 'timestamp', Date.now());
      setShowElement(false);
    }
  };

  useEffect(() => {
    if (query(`hide_${name}`) === '1') {
      handleCompletion();
      setShowElement(false);
    }
  }, []);

  const shouldSeeElement = () => {
    // Is the element marked as "hidden" in local storage?
    const shouldNotSee = getStorage(`hide_${name}`, 'boolean');

    // Was the element dismissed less than 30 days ago?
    const dismissalTime = getStorage(`dismissed_${name}`, 'timestamp');
    const isDismissed = isTimestampValid(dismissalTime, 30 * 1440 * 60 * 1000);

    return !shouldNotSee && !isDismissed && showElement;
  };

  return shouldSeeElement() ? render(handleDismissal, handleCompletion) : null;
};

DismissableElement.propTypes = {
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default DismissableElement;

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { query } from '../../../helpers/url';
import { get as getStorage, set as setStorage } from '../../../helpers/storage';
import {
  getMillisecondsFromDays,
  isTimestampValid,
} from '../../../helpers/datetime';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

const DismissableElement = ({ daysToReRender, name, render, context }) => {
  const [showElement, setShowElement] = useState(true);

  const handleCompletion = () => {
    // Mark the element as "hidden" in local storage.
    setStorage(`hide_${name}`, 'boolean', true);
  };

  const handleDismissal = () => {
    if (!getStorage(`hide_${name}`, 'boolean')) {
      // Mark the element as "dismissed" in local storage & hide it.
      setStorage(`dismissed_${name}`, 'timestamp', Date.now());

      trackAnalyticsEvent(`dismissed_${name}`, {
        // @TODO: will discuss with Data Team possibility of reducing
        // the action to just "element_dismissed".
        action: 'dismissable_element_dismissed',
        category: EVENT_CATEGORIES.siteAction,
        label: name,
        context,
      });
    }
    setShowElement(false);
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
    const isDismissed = isTimestampValid(
      dismissalTime,
      getMillisecondsFromDays(daysToReRender),
    );

    return !shouldNotSee && !isDismissed && showElement;
  };

  return shouldSeeElement() ? render(handleDismissal, handleCompletion) : null;
};

DismissableElement.propTypes = {
  context: PropTypes.object,
  daysToReRender: PropTypes.number,
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

DismissableElement.defaultProps = {
  context: {},
  daysToReRender: 30,
};

export default DismissableElement;

/* global window */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

const AnalyticsWaypoint = ({ className, context, name }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      trackAnalyticsEvent('reached_waypoint', {
        action: 'waypoint_reached',
        category: EVENT_CATEGORIES.waypoint,
        label: name,
        context: {
          url: window.location.href,
          ...context,
          name,
        },
      });
    }
  }, [inView]);

  return (
    <div
      className={className}
      ref={ref}
      data-test="waypoint"
      data-testid="waypoint"
    />
  );
};

AnalyticsWaypoint.propTypes = {
  className: PropTypes.string,
  context: PropTypes.object,
  name: PropTypes.string.isRequired,
};

AnalyticsWaypoint.defaultProps = {
  className: null,
  context: {},
};

export default AnalyticsWaypoint;

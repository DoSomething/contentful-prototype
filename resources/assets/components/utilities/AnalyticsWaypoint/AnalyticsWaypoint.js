import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

const AnalyticsWaypoint = ({ name, context }) => {
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
          ...context,
          name,
        },
      });
    }
  }, [inView]);

  return <div ref={ref} data-test="waypoint" />;
};

AnalyticsWaypoint.propTypes = {
  name: PropTypes.string.isRequired,
  context: PropTypes.object,
};

AnalyticsWaypoint.defaultProps = {
  context: {},
};

export default AnalyticsWaypoint;

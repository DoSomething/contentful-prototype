import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { trackAnalyticsEvent } from '../../../helpers/analytics';

const AnalyticsWaypoint = ({ name, context }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      trackAnalyticsEvent({
        metadata: {
          verb: 'reached',
          noun: 'waypoint',
          target: 'waypoint',
          category: 'waypoint',
          label: name,
        },
        context: {
          ...context,
          name,
        },
      });
    }
  }, [inView]);

  return <div ref={ref} />;
};

AnalyticsWaypoint.propTypes = {
  name: PropTypes.string.isRequired,
  context: PropTypes.object,
};

AnalyticsWaypoint.defaultProps = {
  context: {},
};

export default AnalyticsWaypoint;

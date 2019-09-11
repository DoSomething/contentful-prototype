import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const AnalyticsWaypoint = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      // @TODO: Track analytics event here!
      console.log('ANALYTICS WAYPOINT!');
    }
  }, [inView]);

  return <div ref={ref} />;
};

export default AnalyticsWaypoint;

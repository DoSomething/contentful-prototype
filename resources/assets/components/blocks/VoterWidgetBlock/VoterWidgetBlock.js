import React, { useEffect } from 'react';

import { siteConfig } from '../../../helpers';

const VoterWidgetBlock = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = siteConfig('voting_widget_src_url');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // This value is used to track a submission on behalf of DoSomething.
  // @see https://www.pivotaltracker.com/story/show/174199686/comments/218082111
  const utmSource = 'DST';

  return <div className="civicengine-address" data-utm-source={utmSource} />;
};

export default VoterWidgetBlock;

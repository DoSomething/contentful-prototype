import { css } from '@emotion/core';
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

  // This value is used attribute the submission to DoSomething.
  // @see https://www.pivotaltracker.com/story/show/174199686/comments/218082111
  const utmSource = 'DST';

  return (
    <div
      css={css`
        background: #ececec;
        margin: 0 auto;
        max-width: 500px;
        min-height: 200px;
        padding: 1rem;
        border-radius: 0.3rem;
        opacity: 0.95;
      `}
    >
      <div className="civicengine-address" data-utm-source={utmSource} />
    </div>
  );
};

export default VoterWidgetBlock;

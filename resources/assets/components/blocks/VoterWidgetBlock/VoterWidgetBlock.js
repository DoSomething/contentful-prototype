import React, { useEffect } from 'react';

import { siteConfig } from '../../../helpers';

/**
 * Embeds a CivicEngine Voting Widget.
 * @see https://developers.civicengine.com/docs/widget/
 */
const VoterWidgetBlock = () => {
  const baseUri = `https://app.${siteConfig(
    'civic_engine_client_name',
  )}.civicengine.com/`;
  const embedType = siteConfig('civic_engine_embed_type') || 'bronze';

  // This value is used to track a submission on behalf of DoSomething.
  // @see https://www.pivotaltracker.com/story/show/174199686/comments/218082111
  const utmSource = siteConfig('civic_engine_utm_source') || 'DST';

  // If bronze level, add as an iframe.
  // TODO: Do UTM parameters work here? The documentation suggests they don't.
  // @see https://developers.civicengine.com/docs/widget/#bronze-level-widget-instructions
  if (embedType === 'bronze') {
    return (
      <iframe
        src={`${baseUri}w/address?utm_source=${utmSource}`}
        title="Voting Widget"
      />
    );
  }

  const widget = (
    <div className="civicengine-address" data-utm-source={utmSource} />
  );

  // If gold level, we've already added the required script tags into the <HEAD> element.
  if (embedType === 'gold') {
    return widget;
  }

  // If silver level, we need to include the script tags.
  // @see https://developers.civicengine.com/docs/widget/#silver-level-widget-instructions
  useEffect(() => {
    const script = document.createElement('script');

    script.src = `${baseUri}embed.js`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return widget;
};

export default VoterWidgetBlock;

import React from 'react';

import { siteConfig } from '../../../helpers';

/**
 * Embeds a CivicEngine Voting Widget.
 * @see https://developers.civicengine.com/docs/widget/
 */
const VoterWidgetBlock = () => {
  /**
   * A utm_source parameter is used to track a submission on behalf of DoSomething.
   * Although the docs claim bronze level (using an iframe) does not support UTM params, an email
   * from Ballot Ready to us says this should still send through the utm_source correctly.
   * @see https://www.pivotaltracker.com/story/show/174199686
   */
  const utmSource = siteConfig('civic_engine_utm_source') || 'DST';

  const url = `https://app.${siteConfig(
    'civic_engine_client_name',
  )}.civicengine.com/w/address?utm_source=${utmSource}`;

  return <iframe src={url} title="Voting Widget" width="100%" height="520" />;
};

export default VoterWidgetBlock;

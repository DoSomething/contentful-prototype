import React from 'react';

/*
 * Embeds a CivicEngine Voter Widget.
 * @see https://developers.civicengine.com/docs/widget
 *
 * A utm_source parameter is used to track a submission on behalf of DoSomething.
 * Although the docs claim bronze level (using an iframe) does not support UTM params, an email
 * from Ballot Ready to us says this should still send through the utm_source correctly.
 * @see https://www.pivotaltracker.com/story/show/174199686
 */
const VoterWidgetBlock = () => (
  <iframe
    height="520"
    src="https://app.requestballot.civicengine.com/w/address?utm_source=DST"
    title="Voting Widget"
    width="100%"
  />
);

export default VoterWidgetBlock;

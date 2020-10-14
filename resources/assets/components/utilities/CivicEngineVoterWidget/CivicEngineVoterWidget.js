import React from 'react';

import { getUtms } from '../../../helpers/utm';
import { appendToQuery } from '../../../helpers';

/*
 * Renders a CivicEngine Voter Widget via the Bronze Level embed.
 * @see https://developers.civicengine.com/docs/widget/#bronze-level-widget-instructions
 *
 * Although the docs claim bronze level (using an iframe) does not support UTM params, an email
 * from Ballot Ready to us says this should still send through the UTM's correctly.
 * @see https://www.pivotaltracker.com/story/show/174199686
 */
const CivicEngineVoterWidget = () => (
  <iframe
    height="180"
    src={appendToQuery(
      getUtms(),
      'https://app.dosomething.civicengine.com/w/address',
    )}
    title="Voter Widget"
    width="100%"
  />
);

export default CivicEngineVoterWidget;

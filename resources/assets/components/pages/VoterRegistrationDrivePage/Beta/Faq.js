import React from 'react';

const VoterRegistrationFaq = () => (
  <React.Fragment>
    <h1 className="section-header__title font-normal font-league-gothic uppercase text-4xl -underlined pb-3">
      Learn The Facts
    </h1>
    <ul>
      {/* These will eventually expand/collapse with more information. */}
      <li>Does my vote actually matter?</li>
      <li>Is registering to vote online safe?</li>
      <li>Am I registered to vote?</li>
      <li>I’m not 18. Can I still register to vote?</li>
      <li>Can I register to vote without a driver’s license?</li>
      <li>How do I vote if I’m at college in a different state?</li>
      <li>When are my elections?</li>
      <li>Where can I find more information?</li>
    </ul>
  </React.Fragment>
);

export default VoterRegistrationFaq;

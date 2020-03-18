import React from 'react';

import CausePreferences from './CausePreferences';

const Interests = props => (
  <div className="grid-wide">
    <h1>Your Cause Interests</h1>
    <p>
      We tailor your emails and other communication based on your favorite cause
      areas.
    </p>

    <CausePreferences {...props} />
  </div>
);

export default Interests;

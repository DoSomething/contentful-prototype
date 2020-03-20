import React from 'react';

import CausePreferences from './CausePreferences';

const Interests = () => (
  <div className="grid-wide">
    <h1 className="pl-4 text-lg">Your Cause Interests</h1>
    <p className="pl-4">
      We tailor your emails and other communication based on your favorite cause
      areas.
    </p>

    <CausePreferences />
  </div>
);

export default Interests;

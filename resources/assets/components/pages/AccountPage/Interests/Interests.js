import React from 'react';

import CausePreferences from './CausePreferences';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Interests = () => (
  <div className="grid-wide">
    <SectionHeader title="Cause Interests" />

    <p>
      We tailor your emails and other communication based on your favorite cause
      areas.
    </p>

    <CausePreferences />
  </div>
);

export default Interests;

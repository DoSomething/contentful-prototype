import React from 'react';

import Header from './InfoHeader';

const ScholarshipRequirements = () => (
  <div>
    <Header content="Requirements" />
    <ul className="mt-2 pb-2 list-disc list-inside">
      <li>Under 26 years old</li>
      <li>No minimum GPA</li>
      <li>No essay</li>
    </ul>
  </div>
);

export default ScholarshipRequirements;

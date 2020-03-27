import React from 'react';

import VolunteerCreditsTable from './VolunteerCreditsTable';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Credits = () => (
  <>
    <div className="grid-wide-2/3">
      <SectionHeader underlined title="Volunteer Credits" />
      <p>
        Earn volunteer credits through volunteering. Your certificates will
        appear here within 4 days of you completing a campaign, after our staff
        is able to verify your work! Learn more about our volunteer credit
        program.
      </p>
    </div>

    <div className="grid-wide my-8">
      <VolunteerCreditsTable />
    </div>
  </>
);

export default Credits;

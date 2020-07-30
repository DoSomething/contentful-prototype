import React from 'react';

import Loader from '../../../utilities/Loader';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Credits = () => {
  const VolunteerCreditsQuery = Loader(import('./VolunteerCreditsQuery'));

  return (
    <>
      <div className="grid-wide-2/3">
        <SectionHeader underlined title="Volunteer Credits" />
        <p>
          Earn volunteer credits through volunteering. Your certificates will
          appear here within 14 days of you completing a campaign, after our
          staff is able to verify your work!
          <a href="/us/about/volunteer-hours">
            Learn more about our volunteer credit program
          </a>
          .
        </p>
      </div>

      <div className="grid-wide my-8">
        <VolunteerCreditsQuery />
      </div>
    </>
  );
};
export default Credits;

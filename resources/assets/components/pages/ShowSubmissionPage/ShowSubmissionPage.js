import React from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const ShowSubmissionPage = () => {
  return (
    <>
      <SiteNavigationContainer />

      <main>
        <div>
          <h1 className="uppercase text-3xl md:text-4xl font-league-gothic font-normal">
            We Got Your Submission
          </h1>
          <p>
            Thanks for joining the movement! After we review your submission,
            we&apos;ll add it to the public gallery alongside submissions from
            all the other members taking action in this campaign.
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export default ShowSubmissionPage;

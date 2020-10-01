import React from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const ShowSubmissionPage = () => {
  return (
    <>
      <SiteNavigationContainer />

      <main>
        <h1>We Got Your Submission</h1>
        <p>
          Thanks for joining the movement! After we review your submission,
          we'll add it to the public gallery alongside submissions from all the
          other members taking action in this campaign.
        </p>
      </main>

      <SiteFooter />
    </>
  );
};

export default ShowSubmissionPage;

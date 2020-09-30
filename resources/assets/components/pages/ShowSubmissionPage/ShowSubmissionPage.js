import React from 'react';

const ShowSubmissionPage = () => {
  return (
    <>
      <SiteNavigationContainer />

      <main>
        <Header>We Got Your Submission</Header>
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

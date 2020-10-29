import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Card from '../../utilities/Card/Card';
import Spinner from '../../artifacts/Spinner/Spinner';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

export const GET_AFFIRMATION_CONTENT = gql`
  query submissionActionIdQuery($id: String!) {
    block(id: $submissionActionId)
  }
`;

const ShowSubmissionPage = id => {
  const { loading, error, data } = useQuery(GET_AFFIRMATION_CONTENT, {
    variables: { id },
    skip: !id,
  });

  <Card className="bordered rounded" title={title}>
    {loading ? <Spinner className="flex justify-center p-16" /> : null}
  </Card>;

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

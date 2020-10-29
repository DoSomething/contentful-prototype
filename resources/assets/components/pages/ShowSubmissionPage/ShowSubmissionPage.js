import React from 'react';
import gql from 'graphql-tag';

import { query } from '../../../helpers';
import Query from '../../Query';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

export const GET_AFFIRMATION_CONTENT = gql`
  query submissionActionIdQuery($id: String!) {
    block(id: $id) {
      id
      ... on PhotoSubmissionBlock {
        affirmationContent
      }
    }
  }
`;

const ShowSubmissionPage = () => {
  const id = query('submissionActionId');

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <div>
          <h1 className="uppercase text-3xl md:text-4xl font-league-gothic font-normal">
            We Got Your Submission
          </h1>
          <Query query={GET_AFFIRMATION_CONTENT} variables={{ id }}>
            {data => {
              return (
                data.block.affirmationContent || (
                  <p>
                    Thanks for joining the movement! After we review your
                    submission, we&apos;ll add it to the public gallery
                    alongside submissions from all the other members taking
                    action in this campaign.
                  </p>
                )
              );
            }}
          </Query>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export default ShowSubmissionPage;

import React from 'react';

import Query from '../../Query';
import { query } from '../../../helpers';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import { CONTENTFUL_BLOCK_QUERY } from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const ShowSubmissionPage = () => {
  const id = query('submissionActionId');
  const defaultContent =
    'Thanks for joining the movement! After we review your submission, we&apos;ll add it to the public gallery alongside submissions from all the other members taking action in this campaign.';
  return (
    <>
      <SiteNavigationContainer />

      <main>
        <div>
          <h1 className="uppercase text-3xl md:text-4xl font-league-gothic font-normal">
            We Got Your Submission
          </h1>
          {id ? (
            <Query
              query={CONTENTFUL_BLOCK_QUERY}
              variables={{ id, preview: false }}
            >
              {data =>
                data.block.affirmationContent ? (
                  <TextContent className="mb-6">
                    {data.block.affirmationContent}
                  </TextContent>
                ) : null
              }
            </Query>
          ) : (
            <p>
              <TextContent className="mb-6">{defaultContent}</TextContent>
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default ShowSubmissionPage;

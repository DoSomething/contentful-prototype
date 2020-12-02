import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ReactRouterPropTypes from 'react-router-prop-types';

import Query from '../../Query';
import { query } from '../../../helpers';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import RecommendedCampaignsGallery from './RecommendedCampaignsGallery';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import { CONTENTFUL_BLOCK_QUERY } from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const CAMPAIGN_POST_QUERY = gql`
  query CampaignInfoQuery($postId: Int!) {
    post(id: $postId) {
      id
      url
    }
  }
`;

const ShowSubmissionPage = ({ match }) => {
  const id = query('submissionActionId');
  const defaultContent =
    'Thanks for joining the movement! After we review your submission, we&apos;ll add it to the public gallery alongside submissions from all the other members taking action in this campaign.';
  const postId = Number(match.params.post_id);

  const { loading, error, postData } = useQuery(CAMPAIGN_POST_QUERY, {
    variables: {
      postId,
    },
  });

  // const post = postData

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  console.log('this is the post', postData);

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
            <TextContent className="mb-6">{defaultContent}</TextContent>
          )}
        </div>

        <RecommendedCampaignsGallery />
      </main>
      <SiteFooter />
    </>
  );
};

ShowSubmissionPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ShowSubmissionPage;

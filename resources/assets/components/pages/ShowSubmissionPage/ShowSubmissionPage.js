import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import ReactRouterPropTypes from 'react-router-prop-types';

import Query from '../../Query';
import { env, query } from '../../../helpers';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import RecommendedCampaignsGallery from './RecommendedCampaignsGallery';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import { CONTENTFUL_BLOCK_QUERY } from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const POST_QUERY = gql`
  query PostQuery($postId: Int!) {
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

  const { loading, error, data: postData } = useQuery(POST_QUERY, {
    variables: {
      postId,
    },
  });

  const postImageUrl = get(postData, 'post.url', null);

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <div className="base-12-grid bg-white">
          <div className="grid-wide lg:flex px-2 md:px-4 lg:px-6">
            {postImageUrl && !loading ? (
              <div
                className="w-1/2 md:w-1/4 pt-6 lg:pb-4"
                data-testid="post-submission-image"
              >
                <img
                  className="border-2 border-gray-400 border-solid"
                  alt="Reportback submission"
                  src={postImageUrl}
                />
              </div>
            ) : null}
            <div
              className={classnames('py-3 lg:p-6', {
                'lg:w-3/4 ': postImageUrl,
              })}
            >
              <h1 className="uppercase text-3xl md:text-4xl font-league-gothic font-normal">
                We Got Your Submission
              </h1>

              {id ? (
                <Query
                  query={CONTENTFUL_BLOCK_QUERY}
                  variables={{
                    id,
                    preview: env('CONTENTFUL_USE_PREVIEW_API', false),
                  }}
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
          </div>
        </div>

        <div className="base-12-grid mb-16">
          <div className="grid-wide mt-6 mx-2 md:mx-4 lg:mx-6">
            <h2 className="uppercase text-2xl md:text-3xl font-league-gothic font-normal">
              More Scholarship Opportunities
            </h2>

            <RecommendedCampaignsGallery />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

ShowSubmissionPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ShowSubmissionPage;

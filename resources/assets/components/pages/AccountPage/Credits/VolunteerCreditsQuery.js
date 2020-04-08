import React from 'react';
import gql from 'graphql-tag';
import { groupBy, last } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import { getUserId } from '../../../../helpers/auth';
import Spinner from '../../../artifacts/Spinner/Spinner';
import { getHumanFriendlyDate } from '../../../../helpers';
import VolunteerCreditsTable from './VolunteerCreditsTable';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';

export const VOLUNTEER_CREDIT_POSTS_QUERY = gql`
  query volunteerCreditPostsQuery($userId: String!) {
    paginatedPosts(
      userId: $userId
      type: "photo"
      volunteerCredit: true
      status: [ACCEPTED, PENDING]
      first: 100
    ) {
      edges {
        node {
          id
          createdAt
          quantity
          status
          actionDetails {
            id
            actionLabel
            timeCommitmentLabel
          }
          campaign {
            campaignWebsite {
              showcaseImage {
                url
                description
              }
              showcaseTitle
              showcaseDescription
            }
          }
        }
      }
    }
  }
`;

const VolunteerCreditsQuery = () => {
  const options = { variables: { userId: getUserId() } };

  const { loading, error, data } = useQuery(
    VOLUNTEER_CREDIT_POSTS_QUERY,
    options,
  );

  if (loading) {
    return <Spinner className="flex justify-center p-16" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  // Parse out the posts and group them by action ID.
  const postsFromEdges = data.paginatedPosts.edges.map(edge => edge.node);
  const postsGroupedByAction = groupBy(
    postsFromEdges,
    post => post.actionDetails.id,
  );

  // Next, we parse out the specific data points we'll want from the larger
  // group of action posts generally, and from certain posts specifically.
  const formattedPostData = Object.values(postsGroupedByAction).map(posts => {
    // We need the last post since it has the earliest 'createdAt' date.
    // We'll also use it to retrieve some other common post metadata.
    const lastPost = last(posts);

    // We use the ID as the unique 'key' when we map over the formatted post data.
    const { id, createdAt } = lastPost;

    const { timeCommitmentLabel, actionLabel } = lastPost.actionDetails;

    const campaignWebsite = lastPost.campaign.campaignWebsite;

    // The certificate download button will be disabled if there is no 'accepted' post.
    const pending = posts.every(post => post.status === 'PENDING');

    return {
      id,
      campaignWebsite,
      actionLabel,
      dateCompleted: getHumanFriendlyDate(createdAt),
      volunteerHours: timeCommitmentLabel,
      pending,
    };
  });

  return <VolunteerCreditsTable posts={formattedPostData} />;
};

export default VolunteerCreditsQuery;

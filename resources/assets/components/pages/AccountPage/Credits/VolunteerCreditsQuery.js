import React from 'react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import prettyMilliseconds from 'pretty-ms';
import { get, groupBy, last } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import { getUserId } from '../../../../helpers/auth';
import { featureFlag } from '../../../../helpers/env';
import Spinner from '../../../artifacts/Spinner/Spinner';
import VolunteerCreditsTable from './VolunteerCreditsTable';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';
import { getHumanFriendlyDate } from '../../../../helpers/datetime';

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
          hoursSpent
          status
          url
          actionDetails {
            id
            actionLabel
            timeCommitmentLabel
            noun
            verb
          }
          campaign {
            campaignWebsite {
              path
              showcaseImage {
                url
                description
              }
              showcaseTitle
              showcaseDescription
              affiliateSponsors {
                logo {
                  url
                }
              }
            }
          }
        }
      }
    }

    user(id: $userId) {
      id
      firstName
      lastName
      email
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
  const formattedPostData = Object.values(postsGroupedByAction)
    .map(posts => {
      // We need the last post since it has the earliest 'createdAt' date.
      // We'll also use it to retrieve some other common post metadata.
      const lastPost = last(posts);

      const { actionDetails, createdAt } = lastPost;

      const {
        id,
        timeCommitmentLabel,
        actionLabel,
        noun,
        verb,
      } = actionDetails;

      const campaignWebsite = lastPost.campaign.campaignWebsite;

      const acceptedPosts = posts.filter(post => post.status === 'ACCEPTED');

      // Calculate total quantity from all accepted posts.
      const quantity = acceptedPosts.reduce(
        (totalQuantity, post) => totalQuantity + post.quantity,
        0,
      );

      // Calculate total hours spent from all accepted posts.
      const hoursSpent = acceptedPosts.reduce(
        (totalHoursSpent, post) => totalHoursSpent + (post.hoursSpent || 0),
        0,
      );

      // Generate human-friendly hoursSpent label. (1.5 -> "1 hour 30 minutes").
      const hoursSpentLabel =
        hoursSpent && featureFlag('hours_spent_in_vc_certificates')
          ? prettyMilliseconds(
              // Multiply by minutes * seconds * milliseconds:
              // We round up the minutes to account for missing decimal points.
              // (So 0.33 -> 20 minutes instead of an awkward 19.8).
              Math.ceil(hoursSpent * 60) * 60 * 1000,
              { verbose: true },
            )
          : null;

      // Generate human-friendly impact label based on quantity and action noun + verb.
      // Will be 'null' for actions where we don't collect quantity info, or where total impact tallies to 0.
      const impactLabel = quantity
        ? `${pluralize(noun, quantity, true)} ${verb}`
        : null;

      // Grab the photo URL of the earliest accepted post.
      const firstAcceptedPost = last(acceptedPosts);
      const photo = get(firstAcceptedPost, 'url');

      // The certificate download button will be disabled if there is no 'accepted' post.
      const pending = !firstAcceptedPost;

      return {
        actionId: id,
        campaignWebsite,
        actionLabel,
        dateCompleted: getHumanFriendlyDate(createdAt),
        volunteerHours: timeCommitmentLabel,
        impactLabel,
        hoursSpentLabel,
        photo,
        pending,
        user: data.user,
      };
    })
    // The certificates & display table won't function without campaign website data.
    .filter(post => post.campaignWebsite);

  return <VolunteerCreditsTable certificatePosts={formattedPostData} />;
};

export default VolunteerCreditsQuery;

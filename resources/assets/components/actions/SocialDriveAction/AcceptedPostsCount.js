import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';

const USER_ACCEPTED_POSTS_COUNT_FOR_ACTION_QUERY = gql`
  query UserAcceptedPostsCountForAction($userId: String!, $actionId: Int!) {
    postsCount(
      userId: $userId
      actionIds: [$actionId]
      status: [ACCEPTED]
      limit: 51
    )
  }
`;

const AcceptedPostsCount = ({ actionId, userId }) => {
  return (
    <div
      data-test="accepted-posts-count"
      className="mt-6' lg:w-1/3 lg:pl-3 lg:mt-0'"
    >
      <Card className="bordered rounded" title="More info">
        <div data-test="accepted-posts-count-label" className="p-3">
          <span className="font-bold uppercase text-gray-600">
            Total scholarship entries
          </span>
          <Query
            query={USER_ACCEPTED_POSTS_COUNT_FOR_ACTION_QUERY}
            variables={{ actionId, userId }}
          >
            {data => (
              <h1 data-test="accepted-posts-count-amount">
                {data.postsCount === 51 ? '50+' : data.postsCount}
              </h1>
            )}
          </Query>
        </div>
      </Card>
    </div>
  );
};

AcceptedPostsCount.propTypes = {
  actionId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
};

export default AcceptedPostsCount;

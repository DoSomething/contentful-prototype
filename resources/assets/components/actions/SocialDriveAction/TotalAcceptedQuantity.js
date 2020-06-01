import React from 'react';
import gql from 'graphql-tag';
import { sumBy } from 'lodash';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';

const USER_ACCEPTED_POSTS_FOR_ACTION_QUERY = gql`
  query UserAcceptedPostsForAction($userId: String!, $actionId: Int!) {
    posts(userId: $userId, actionIds: [$actionId], status: [ACCEPTED]) {
      quantity
    }
  }
`;

const TotalAcceptedQuantity = ({ actionId, label, userId }) => {
  return (
    <div
      data-test="total-accepted-quantity"
      className="mt-6 lg:w-1/3 lg:pl-3 lg:mt-0"
    >
      <Card className="bordered rounded" title="More info">
        <div className="p-3">
          <span className="font-bold uppercase text-gray-600">{label}</span>
          <Query
            query={USER_ACCEPTED_POSTS_FOR_ACTION_QUERY}
            variables={{ actionId, userId }}
          >
            {data => (
              <h1 data-test="total-accepted-quantity-value">
                {sumBy(data.posts, post => post.quantity)}
              </h1>
            )}
          </Query>
        </div>
      </Card>
    </div>
  );
};

TotalAcceptedQuantity.propTypes = {
  actionId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default TotalAcceptedQuantity;

import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import AccountNavigation from './AccountNavigation';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';

const POSTS_QUERY = gql`
  query PostsQuery($userId: String!) {
    postsByUserId(id: $userId) {
      status
      url(w: 300, h: 300)
      text
    }
  }
`;

const PostsQuery = ({ userId }) => (
  <Query query={POSTS_QUERY} queryName="user" variables={{ userId }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div className="spinner -centered" />;
      }
      if (error) {
        return <ErrorBlock />;
      }
      return <Posts {...data} />;
    }}
  </Query>
);

PostsQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default PostsQuery;

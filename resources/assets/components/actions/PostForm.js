import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { env } from '../../helpers/env';
import graphqlClient from '../../graphql';

export const USER_ACTION_SCHOOL_ID_QUERY = gql`
  query ActionAndUserByIdQuery($actionId: Int!, $userId: String!) {
    action(id: $actionId) {
      collectSchoolId
    }
    user(id: $userId) {
      schoolId
    }
  }
`;

class PostForm extends React.Component {
  /**
   * Create a new instance.
   *
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    /**
     * We need to create an ApolloClient instance to call query to make GraphQL requests within the
     * Submission Action components because they are defined as classes, and can't use React Hooks.
     * @see https://reactjs.org/warnings/invalid-hook-call-warning.html
     *
     * Because we're querying outside of our App, our tests fail with an Invariant Violation,
     * because MockedProvider can't find fetch for this new Apollo Client we're creating on the fly.
     * @see https://circleci.com/gh/DoSomething/phoenix-next/1398?utm_campaign=vcs-integration-link&utm_medium=referral&utm_source=github-build-link
     */
    this.gqlClient = this.props.automatedTest
      ? null
      : graphqlClient(env('GRAPHQL_URL'));
  }

  /**
   * Query GraphQL to determine whether to save user's current school when creating a post.
   *
   * @return {Promise}
   */
  async getUserActionSchoolId() {
    const { actionId, automatedTest, userId } = this.props;
    /**
     * Legacy campaign content needs action backfills to create actionId.
     * Some PostForm children may appear for anonymous users, e.g. StoryPage blocks.
     * If this is an automatedTest, skip this request completely to avoid Invariant Violation.
     */
    if (!actionId || !userId || automatedTest) {
      return Promise.resolve(null);
    }

    const result = await this.gqlClient.query({
      query: USER_ACTION_SCHOOL_ID_QUERY,
      variables: { userId, actionId },
    });

    return result.data.action.collectSchoolId
      ? result.data.user.schoolId
      : null;
  }
}

PostForm.propTypes = {
  actionId: PropTypes.number,
  automatedTest: PropTypes.bool,
  userId: PropTypes.string,
};

PostForm.defaultProps = {
  automatedTest: false,
  actionId: null,
  userId: null,
};

export default PostForm;

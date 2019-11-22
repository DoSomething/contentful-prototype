import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { env } from '../../helpers';
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
     * Needed to query GraphQL on form submit events while our Submission components are
     * defined as classes and can't use React Hooks until they are as functional components.

     *
     * Because we're querying outside of our App, our tests fail with an Invariant Violation,
     * because MockedProvider can't find fetch for this new Apollo Client we're creating on the fly.
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

    if (!actionId || automatedTest) {
      return Promise.resolve(null);
    }

    /**
     * We use ApolloClient.query here because React hooks fail wuith Invalid Hook Call warning.
     * @see https://reactjs.org/warnings/invalid-hook-call-warning.html
     */
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
  userId: PropTypes.string.isRequired,
};

PostForm.defaultProps = {
  automatedTest: false,
  actionId: null,
};

export default PostForm;

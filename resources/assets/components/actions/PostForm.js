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
     * defined as classes -- and can't use React Hooks until we refactor as functional components.
     */
    this.gqlClient = graphqlClient(env('GRAPHQL_URL'));
  }

  /**
   * Query GraphQL to determine whether to save user's current school when creating a post.
   */
  async getUserActionSchoolId() {
    const { actionId, userId } = this.props;

    if (!actionId) {
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
  userId: PropTypes.string.isRequired,
};

PostForm.defaultProps = {
  actionId: null,
};

export default PostForm;

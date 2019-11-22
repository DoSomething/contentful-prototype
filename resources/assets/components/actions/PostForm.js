import React from 'react';

import { env } from '../../helpers';
import graphqlClient from '../../graphql';

class PostForm extends React.Component {
  /**
   * Create a new instance.
   *
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    /**
     * Needed to query GraphQL on form submit events while our ActonTypeSubmissionAction components
     * are classes, and can't use React Hooks until we refactor as functional components.
     */
    this.gqlClient = graphqlClient(env('GRAPHQL_URL'));
  }
}

export default PostForm;

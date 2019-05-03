import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import SoftEdgeWidgetAction from './SoftEdgeWidgetAction';

const ACCOUNT_QUERY = gql`
  query AccountQuery(props.userId: String!) {
    user(id: props.userId) {
      id
      firstName
      lastName
      mobile
      email
    }
  }
`;

const UserQuery = ({ props }) => (
  <Query
    query={ACCOUNT_QUERY}
    queryName="user"
    variables={{ userId: props.userId }}
  >
    {({ error, data }) => {
      // const isLoaded = !loading;
      // const { embed } = data;

      if (error) {
        return <ErrorBlock />;
      }

      // If an <iframe> code snippet is provided, use that.
      // Otherwise, fill in our "embed card".
      // return isLoaded && embed && embed.html ? (
      return <SoftEdgeWidgetAction {...data} {...props} />;
      // );
    }}
  </Query>
);

export default UserQuery;

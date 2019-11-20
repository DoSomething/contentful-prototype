import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Placeholder from '../utilities/Placeholder';

const ACTION_AND_USER_QUERY = gql`
  query ActionAndUserByIdQuery($actionId: Int!, $userId: String!) {
    action(id: $actionId) {
      collectSchoolId
    }
    user(id: $userId) {
      schoolId
    }
  }
`;

const ActionQuery = ({ actionId, userId, children }) => {
  const { loading, error, data } = useQuery(ACTION_AND_USER_QUERY, {
    variables: { actionId, userId },
  });

  if (loading || error) {
    return <Placeholder error={error} />;
  }

  return children(data);
};

ActionQuery.propTypes = {
  actionId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default ActionQuery;

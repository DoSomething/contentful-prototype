import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

const COLLECT_SCHOOL_ID_QUERY = gql`
  query CollectSchoolIdQuery($actionId: Int!, $userId: String!) {
    action(id: $actionId) {
      collectSchoolId
    }
    user(id: $userId) {
      schoolId
    }
  }
`;

const PhotoSubmissionActionQuery = ({ actionId, userId, children }) => {
  const { loading, error, data } = useQuery(COLLECT_SCHOOL_ID_QUERY, {
    variables: { actionId, userId },
  });

  if (loading) {
    return <h3>Loading</h3>;
  }

  if (error) {
    return <h3>{JSON.stringify(error)}</h3>;
  }

  return children(data);
};

PhotoSubmissionActionQuery.propTypes = {
  actionId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default PhotoSubmissionActionQuery;

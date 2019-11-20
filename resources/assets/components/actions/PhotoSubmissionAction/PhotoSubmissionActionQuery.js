import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Placeholder from '../../utilities/Placeholder';

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

  if (loading || error) {
    return <Placeholder error={error} />;
  }

  return children(data);
};

PhotoSubmissionActionQuery.propTypes = {
  actionId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default PhotoSubmissionActionQuery;

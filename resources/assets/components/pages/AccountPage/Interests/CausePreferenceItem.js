import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';

const CAUSE_PREFERENCE_QUERY = gql`
  query CausePreferenceQuery($userId: String!) {
    user(id: $userId) {
      id
      causes
    }
  }
`;

const CAUSE_PREFERENCE_MUTATION = gql`
  mutation CausePreferences(
    $userId: String!
    $cause: CauseIdentifier!
    $interested: Boolean!
  ) {
    updateCausePreferences(
      id: $userId
      cause: $cause
      interested: $interested
    ) {
      id
      causes
    }
  }
`;

const CausePreferenceItem = ({ cause, description, title }) => {
  const options = { variables: { userId: window.AUTH.id } };

  // Make the initial query to get the user's subscriptions
  const { data, loading, error } = useQuery(CAUSE_PREFERENCE_QUERY, options);
  const [updateInterest] = useMutation(CAUSE_PREFERENCE_MUTATION, options);

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return <div className="spinner" />;
  }

  const { causes } = data.user;

  return (
    <div className="border border-solid border-gray-300">
      <h1 className="text-blurple-500 text-base text-bold">{title}</h1>
      <p>{description}</p>
      <button
        type="button"
        className={
          !causes.includes(cause)
            ? 'btn mx-4 mb-4 bg-blurple-500 text-white border border-solid border-blurple-500 hover:bg-blurple-300 focus:bg-blurple-500 focus:text-white focus:outline-none'
            : 'btn mx-4 mb-4 bg-white border border-solid border-blurple-500 text-blurple-500 hover:border-blurple-300 hover:text-blurple-200 focus:bg-white focus:text-blurple-500 focus:outline-none'
        }
        onClick={() =>
          updateInterest({
            variables: {
              cause,
              interested: !causes.includes(cause),
            },
          })
        }
      >
        {causes.includes(cause) ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

CausePreferenceItem.propTypes = {
  cause: PropTypes.string.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
};

CausePreferenceItem.defaultProps = {
  description: null,
  title: null,
};

export default CausePreferenceItem;

import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

  const causes = get(data, 'user.causes', []);

  return (
    <div className="border border-solid border-gray-300 p-4 rounded-md flex justify-between content-center">
      <div className="w-2/3 lg:w-3/4 pr-2">
        <h1 className="text-blurple-500 text-base text-bold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        className={classNames(
          'btn w-1/3 lg:w-1/4 border border-solid border-blurple-500 focus:outline-none align-middle',
          !causes.includes(cause)
            ? 'bg-blurple-500 text-white hover:bg-blurple-300 focus:bg-blurple-500 focus:text-white'
            : 'bg-white border text-blurple-500 border-solid hover:border-blurple-300 hover:text-blurple-200 focus:bg-white focus:text-blurple-500',
        )}
        onClick={() =>
          updateInterest({
            variables: {
              cause,
              interested: !causes.includes(cause),
            },
          })
        }
      >
        {!loading ? (
          <>{causes.includes(cause) ? 'Unfollow' : ' Follow '}</>
        ) : (
          <div className="spinner" />
        )}
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

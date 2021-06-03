import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Spinner from '../../../artifacts/Spinner/Spinner';
import ToggleButton from '../../../utilities/Button/ToggleButton';

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

const CausePreferenceItem = ({ attributes, cause, description, title }) => {
  const options = { variables: { userId: window.AUTH.id } };

  // Make the initial query to get the user's subscriptions
  const { data, loading, error } = useQuery(CAUSE_PREFERENCE_QUERY, options);
  const [updateInterest, { loading: modifying }] = useMutation(
    CAUSE_PREFERENCE_MUTATION,
    options,
  );

  if (error) {
    return <p>Something went wrong!</p>;
  }

  const causes = get(data, 'user.causes', []);

  return (
    <div className="bg-white border border-solid border-gray-300 p-4 rounded-md flex">
      <div className="w-2/3 lg:w-3/4 pr-4">
        <h1 className="text-blurple-500 text-base text-bold">{title}</h1>

        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="w-1/3 lg:w-1/4">
        {loading ? (
          <Spinner className="flex justify-center p-2" />
        ) : (
          <ToggleButton
            attributes={attributes}
            activateText="Follow"
            className="w-full"
            deactivateText="Unfollow"
            isDisabled={modifying}
            isLoading={modifying}
            isToggled={causes.includes(cause)}
            onClick={() =>
              updateInterest({
                variables: {
                  cause,
                  interested: !causes.includes(cause),
                },
              })
            }
          />
        )}
      </div>
    </div>
  );
};

CausePreferenceItem.propTypes = {
  attributes: PropTypes.object,
  cause: PropTypes.string.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
};

CausePreferenceItem.defaultProps = {
  attributes: null,
  description: null,
  title: null,
};

export default CausePreferenceItem;

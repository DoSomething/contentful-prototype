import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';

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

const CausePreferenceItem = ({ cause, causes, description, title }) => {
  const options = { variables: { userId: window.AUTH.id } };
  const [updateInterest] = useMutation(CAUSE_PREFERENCE_MUTATION, options);

  return (
    <div className="border border-solid border-gray-300 p-4 rounded-md flex space-between">
      <div>
        <h1 className="text-blurple-500 text-base text-bold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
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
  causes: PropTypes.instanceOf(Array).isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
};

CausePreferenceItem.defaultProps = {
  description: null,
  title: null,
};

export default CausePreferenceItem;

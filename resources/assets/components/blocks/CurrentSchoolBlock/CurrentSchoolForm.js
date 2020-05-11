import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import SchoolSelect from './SchoolSelect';
import SchoolStateSelect from '../../utilities/UsaStateSelect';
import PrimaryButton from '../../utilities/Button/PrimaryButton';

const USER_SCHOOL_MUTATION = gql`
  mutation UserSchoolMutation($userId: String!, $schoolId: String) {
    updateSchoolId(id: $userId, schoolId: $schoolId) {
      id
      schoolId
    }
  }
`;

const CurrentSchoolForm = ({ description, userId }) => {
  const [school, setSchool] = useState(null);
  const [schoolState, setSchoolState] = useState(null);
  const [updateUserSchool] = useMutation(USER_SCHOOL_MUTATION);

  return (
    <div className="p-3" data-test="school-finder-form">
      {description ? <p>{description}</p> : null}

      <div className="mt-6" data-test="select-state">
        <strong>State</strong>

        <SchoolStateSelect onChange={selected => setSchoolState(selected)} />
      </div>

      {schoolState ? (
        <div className="mt-6" data-test="select-school">
          <SchoolSelect
            onChange={selected => setSchool(selected)}
            filterByState={schoolState.abbreviation}
          />
        </div>
      ) : null}

      <PrimaryButton
        className="block mt-6 text-lg w-full"
        isDisabled={!school}
        onClick={() => {
          updateUserSchool({
            variables: { schoolId: school ? school.id : null, userId },
            refetchQueries: ['UserSchoolQuery'],
          });
        }}
        text="Submit"
      />
    </div>
  );
};

CurrentSchoolForm.propTypes = {
  description: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

CurrentSchoolForm.defaultProps = {
  description: null,
};

export default CurrentSchoolForm;

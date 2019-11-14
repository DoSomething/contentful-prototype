import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import Button from '../Button/Button';
import SchoolSelect from './SchoolSelect';
import SchoolStateSelect from '../UsaStateSelect';

const USER_SCHOOL_MUTATION = gql`
  mutation UserSchoolMutation($userId: String!, $schoolId: String) {
    updateSchoolId(id: $userId, schoolId: $schoolId) {
      id
      schoolId
      school {
        id
        name
        city
        state
      }
    }
  }
`;

const UpdateSchool = ({ userId }) => {
  const [school, setSchool] = useState(null);
  const [schoolState, setSchoolState] = useState(null);
  const [updateUserSchool] = useMutation(USER_SCHOOL_MUTATION);

  return (
    <React.Fragment>
      <p className="p-3">
        Pick your school and whatever. Invite your classmates to join this
        campaign and donate their jeans to win prizes and some other stuff.
      </p>
      <div className="select-state p-3">
        <strong>State</strong>
        <SchoolStateSelect onChange={selected => setSchoolState(selected)} />
      </div>
      {schoolState ? (
        <div className="select-school p-3">
          <SchoolSelect
            onChange={selected => setSchool(selected)}
            filterByState={schoolState.abbreviation}
          />
        </div>
      ) : null}
      <Button
        onClick={() => {
          updateUserSchool({
            variables: { schoolId: school ? school.id : null, userId },
          });
        }}
        disabled={!school}
        attached
      >
        Submit
      </Button>
    </React.Fragment>
  );
};

UpdateSchool.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UpdateSchool;

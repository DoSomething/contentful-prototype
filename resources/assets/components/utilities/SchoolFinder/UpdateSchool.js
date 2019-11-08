import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Button from '../Button/Button';
import SchoolSelect from './SchoolSelect';
import SchoolStateSelect from '../UsaStateSelect';

const USER_SCHOOL_MUTATION = gql`
  mutation UserSchoolMutation($userId: String!, $schoolId: String) {
    updateSchoolId(id: $userId, schoolId: $schoolId) {
      id
      schoolId
    }
  }
`;

const UpdateSchool = ({ onSubmit, userId }) => {
  const [schoolId, setSchoolId] = useState(null);
  const [schoolState, setSchoolState] = useState(null);

  return (
    <React.Fragment>
      <p className="padded">
        Pick your school and whatever. Invite your classmates to join this
        campaign and donate their jeans to win prizes and some other stuff.
      </p>
      <div className="select-state padded">
        <strong>State</strong>
        <SchoolStateSelect onChange={selected => setSchoolState(selected)} />
      </div>
      {schoolState ? (
        <div className="select-school padded">
          <SchoolSelect
            onChange={selected => setSchoolId(selected.gsid)}
            filterByState={schoolState.abbreviation}
          />
        </div>
      ) : null}
      <Mutation
        mutation={USER_SCHOOL_MUTATION}
        variables={{ schoolId, userId }}
        update={() => onSubmit(schoolId)}
      >
        {userMutation => (
          <Button onClick={userMutation} disabled={schoolId === null} attached>
            Submit
          </Button>
        )}
      </Mutation>
    </React.Fragment>
  );
};

UpdateSchool.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default UpdateSchool;

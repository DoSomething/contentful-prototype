import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import SchoolSelect from './SchoolSelect';
import SchoolStateSelect from '../UsaStateSelect';

const UpdateSchool = ({ onSubmit }) => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedSchoolState, setSelectedSchoolState] = useState(null);

  return (
    <React.Fragment>
      <p className="padded">
        Pick your school and whatever. Invite your classmates to join this
        campaign and donate their jeans to win prizes and some other stuff.
      </p>
      <div className="select-state padded">
        <strong>State</strong>
        <SchoolStateSelect
          onChange={selected => setSelectedSchoolState(selected)}
        />
      </div>
      {selectedSchoolState ? (
        <div className="select-school padded">
          <SchoolSelect
            onChange={selected => setSelectedSchool(selected)}
            filterByState={selectedSchoolState.abbreviation}
          />
        </div>
      ) : null}
      <Button
        onClick={() => onSubmit(selectedSchool.gsid)}
        disabled={selectedSchool === null}
        attached
      >
        Submit
      </Button>
    </React.Fragment>
  );
};

UpdateSchool.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateSchool;

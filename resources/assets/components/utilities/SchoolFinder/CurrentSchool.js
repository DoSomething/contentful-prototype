import React from 'react';
import PropTypes from 'prop-types';

import { SCHOOL_NOT_AVAILABLE_SCHOOL_ID } from '../../../constants/users';

const CurrentSchool = ({ school }) => {
  if (school.id === SCHOOL_NOT_AVAILABLE_SCHOOL_ID) {
    return (
      <React.Fragment>
        <h3>No School Selected</h3>
        <p>
          No school copy goes here, please email Sahara with information about
          your school.
        </p>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h3>{school.name}</h3>
      <small className="uppercase">
        {school.city}, {school.state}
      </small>
    </React.Fragment>
  );
};

CurrentSchool.propTypes = {
  school: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default CurrentSchool;

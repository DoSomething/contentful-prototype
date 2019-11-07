import React from 'react';
import PropTypes from 'prop-types';

const CurrentSchool = ({ schoolId }) => (
  <div className="padded">
    <p>
      Something something something school finder post verification copy. You
      can email{' '}
      <a href="mailto:Sahara@DoSomething.org">mailto:Sahara@DoSomething.org</a>{' '}
      to change your school.
    </p>
    <h3>{schoolId}</h3>
    <small className="uppercase">City, state</small>
  </div>
);

CurrentSchool.propTypes = {
  schoolId: PropTypes.string.isRequired,
};

export default CurrentSchool;

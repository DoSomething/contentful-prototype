import React from 'react';
import PropTypes from 'prop-types';

const CurrentSchool = ({ school }) => (
  <div className="p-3">
    <p>
      Something something something school finder post verification copy. You
      can email{' '}
      <a href="mailto:Sahara@DoSomething.org">mailto:Sahara@DoSomething.org</a>{' '}
      to change your school.
    </p>
    <h3>{school.name}</h3>
    {school.city ? (
      <small className="uppercase">
        {school.city}, {school.state}
      </small>
    ) : null}
  </div>
);

CurrentSchool.propTypes = {
  school: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default CurrentSchool;

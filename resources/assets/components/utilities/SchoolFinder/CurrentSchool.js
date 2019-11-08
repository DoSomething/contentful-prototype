import React from 'react';
import PropTypes from 'prop-types';

const CurrentSchool = ({ name, city, state }) => (
  <div className="padded">
    <p>
      Something something something school finder post verification copy. You
      can email{' '}
      <a href="mailto:Sahara@DoSomething.org">mailto:Sahara@DoSomething.org</a>{' '}
      to change your school.
    </p>
    <h3>{name}</h3>
    {city ? (
      <small className="uppercase">
        {city}, {state}
      </small>
    ) : null}
  </div>
);

CurrentSchool.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  state: PropTypes.string,
};

CurrentSchool.defaultProps = {
  city: null,
  state: null,
};

export default CurrentSchool;

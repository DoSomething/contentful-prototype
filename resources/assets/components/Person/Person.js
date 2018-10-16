import React from 'react';
import PropTypes from 'prop-types';


const Person = ({ json }) => {
  switch (json.fields.type) {
    default:
      return null;
  }
};

Person.propTypes = {
  json: PropTypes.shape({
    fields: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Person;

import React from 'react';
import PropTypes from 'prop-types';

import StaffTemplate from './templates/StaffTemplate/StaffTemplate';

const Person = ({ json }) => {
  switch (json.fields.type) {
    case 'staff':
      return <StaffTemplate {...json.fields} />;
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

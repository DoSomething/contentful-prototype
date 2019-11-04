import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

const SchoolSelect = ({ filterByState, onChange }) => {
  function fetchSchools(searchString, callback) {
    // @TODO: Handle errors.
    return fetch(
      `https://lofischools.herokuapp.com/search?state=${filterByState}&query=${searchString}`,
    )
      .then(res => res.json())
      .then(res => callback(res.results));
  }

  return (
    <AsyncSelect
      defaultOptions
      getOptionLabel={school =>
        `${school.name} - ${school.city}, ${school.state}`
      }
      getOptionValue={school => school.id}
      loadOptions={fetchSchools}
      placeholder="Enter your school name"
      noOptionsMessage={select =>
        select.inputValue.length > 1
          ? `No results for "${select.inputValue}"`
          : null
      }
      onChange={onChange}
    />
  );
};

SchoolSelect.propTypes = {
  filterByState: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolSelect;

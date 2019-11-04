import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

const SchoolSelect = ({ filterByState, onChange }) => {
  // Debounce school search to query for schools after 250 ms typing pause.
  // @see https://github.com/JedWatson/react-select/issues/614#issuecomment-244006496
  const debouncedFetch = debounce((searchString, callback) => {
    fetch(
      `https://lofischools.herokuapp.com/search?state=${filterByState}&query=${searchString}`,
    )
      .then(res => res.json())
      .then(res => callback(res.results))
      .catch(error => callback(error));
  }, 250);

  return (
    <AsyncSelect
      defaultOptions
      getOptionLabel={school =>
        `${school.name} - ${school.city}, ${school.state}`
      }
      getOptionValue={school => school.id}
      loadOptions={(input, callback) => {
        // Avoid querying by empty school name on page load.
        // @see https://github.com/JedWatson/react-select/issues/614#issuecomment-380763225
        if (!input) {
          return Promise.resolve([]);
        }
        return debouncedFetch(input, callback);
      }}
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

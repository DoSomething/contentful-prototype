import React from 'react';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useApolloClient } from '@apollo/react-hooks';

import {
  SCHOOL_NOT_AVAILABLE_OPTION_LABEL,
  SCHOOL_NOT_AVAILABLE_SCHOOL_ID,
} from '../../../constants/school-finder';

const SEARCH_SCHOOLS_QUERY = gql`
  query SearchSchoolsQuery($location: String!, $name: String!) {
    searchSchools(location: $location, name: $name) {
      id
      name
      city
      location
    }
  }
`;

const SchoolSelect = ({
  includeSchoolNotAvailableOption,
  isDisabled,
  onChange,
  placeholder,
  schoolLocation,
}) => {
  const client = useApolloClient();

  const schoolNotAvailableOption = includeSchoolNotAvailableOption
    ? [
        {
          id: SCHOOL_NOT_AVAILABLE_SCHOOL_ID,
        },
      ]
    : null;

  // Debounce school search to query for schools after 250 ms typing pause.
  // @see https://github.com/JedWatson/react-select/issues/614#issuecomment-244006496
  const fetchSchools = debounce((searchString, callback) => {
    client
      .query({
        query: SEARCH_SCHOOLS_QUERY,
        variables: {
          location: schoolLocation,
          name: searchString,
        },
      })
      .then(result => {
        const schools = result.data.searchSchools;

        callback(schools.length ? schools : schoolNotAvailableOption);
      })
      .catch(error => callback(error));
  }, 250);

  return (
    <AsyncSelect
      defaultOptions
      getOptionLabel={school =>
        school.id === SCHOOL_NOT_AVAILABLE_SCHOOL_ID
          ? SCHOOL_NOT_AVAILABLE_OPTION_LABEL
          : `${school.name} - ${school.city}, ${school.location.substring(3)}`
      }
      getOptionValue={school => school.id}
      isClearable
      isDisabled={isDisabled}
      /**
       * Changing per schoolLocation will result in clearing any selected options.
       * If user selects a school, but then changes location, force reselect.
       * @see https://stackoverflow.com/a/55142916
       */
      key={schoolLocation}
      loadOptions={(input, callback) => {
        /**
         * Avoid querying by empty school name on page load.
         * @see https://github.com/JedWatson/react-select/issues/614#issuecomment-380763225
         */
        if (!input) {
          return Promise.resolve([]);
        }

        return fetchSchools(input, callback);
      }}
      noOptionsMessage={({ inputValue }) =>
        inputValue.length
          ? `Oops, we can't find a school called "${inputValue}"`
          : 'Enter your school name'
      }
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

SchoolSelect.propTypes = {
  includeSchoolNotAvailableOption: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  schoolLocation: PropTypes.string.isRequired,
};

SchoolSelect.defaultProps = {
  includeSchoolNotAvailableOption: false,
  isDisabled: false,
  placeholder: 'Enter school name',
};

export default SchoolSelect;

import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import AsyncSelect from 'react-select/async';
import { useApolloClient } from '@apollo/react-hooks';

import { SCHOOL_NOT_AVAILABLE_SCHOOL_ID } from '../../../constants/users';

const SEARCH_SCHOOLS_QUERY = gql`
  query SearchSchoolsQuery($state: String!, $name: String!) {
    searchSchools(state: $state, name: $name) {
      id
      name
      city
      state
    }
  }
`;

const SchoolSelect = ({ filterByState, onChange }) => {
  const client = useApolloClient();
  // Debounce school search to query for schools after 250 ms typing pause.
  // @see https://github.com/JedWatson/react-select/issues/614#issuecomment-244006496
  const fetchSchools = debounce((searchString, callback) => {
    client
      .query({
        query: SEARCH_SCHOOLS_QUERY,
        variables: {
          state: filterByState,
          name: searchString,
        },
      })
      .then(result => {
        // Return search results, or School Not Available ID if no school was found.
        const options = result.data.searchSchools.length
          ? result.data.searchSchools
          : [
              {
                id: SCHOOL_NOT_AVAILABLE_SCHOOL_ID,
              },
            ];
        callback(options);
      })
      .catch(error => callback(error));
  }, 250);

  return (
    <AsyncSelect
      defaultOptions
      getOptionLabel={school =>
        school.id === SCHOOL_NOT_AVAILABLE_SCHOOL_ID
          ? "My school isn't available"
          : `${school.name} - ${school.city}, ${school.state}`
      }
      getOptionValue={school => school.id}
      isClearable
      /**
       * Changing per filterByState will result in clearing any selected options.
       * If user selects a school, but then changes the school state to something else, they should
       * be forced to find school in the selected state.
       * @see https://stackoverflow.com/a/55142916
       */
      key={filterByState}
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
      noOptionsMessage={() => 'Enter your school name'}
      onChange={onChange}
    />
  );
};

SchoolSelect.propTypes = {
  filterByState: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolSelect;

import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import AsyncSelect from 'react-select/async';

import { env } from '../../../helpers';
import graphqlClient from '../../../graphql';

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

/**
 * Ideally would call useApolloClient() but it triggers an error Invariant Violation
 * No Apollo Client instance.
 *
 * @see https://stackoverflow.com/a/57743861
 */
const client = graphqlClient(env('GRAPHQL_URL'));

const SchoolSelect = ({ filterByState, onChange }) => {
  // Debounce school search to query for schools after 250 ms typing pause.
  // @see https://github.com/JedWatson/react-select/issues/614#issuecomment-244006496
  const debouncedFetch = debounce((searchString, callback) => {
    client
      .query({
        query: SEARCH_SCHOOLS_QUERY,
        variables: {
          state: filterByState,
          name: searchString,
        },
      })
      .then(res => callback(res.data.searchSchools))
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
      noOptionsMessage={select =>
        select.inputValue.length > 1
          ? `No results for "${select.inputValue}"`
          : null
      }
      onChange={onChange}
      placeholder="Enter your school name"
    />
  );
};

SchoolSelect.propTypes = {
  filterByState: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolSelect;

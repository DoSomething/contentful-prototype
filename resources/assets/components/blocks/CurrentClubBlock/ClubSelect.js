import React from 'react';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useApolloClient } from '@apollo/react-hooks';

const SEARCH_CLUBS_QUERY = gql`
  query SearchClubsQuery($name: String!) {
    clubs(name: $name) {
      id
      name
      city
      location
    }
  }
`;

const ClubSelect = ({ onChange }) => {
  /**
   * This is copied by example from the blocks/CurrentSchoolBlock/SchoolSelect, which has comments
   * detailing debouncing the useApolloClient hook (AsyncSelect loadOptions expects a Promise).
   */
  const client = useApolloClient();

  const fetchClubs = debounce(
    (searchString, callback) =>
      client
        .query({
          query: SEARCH_CLUBS_QUERY,
          variables: {
            name: searchString,
          },
        })
        .then(result => callback(result.data.clubs))
        .catch(error => callback(error)),
    250,
  );

  return (
    <AsyncSelect
      getOptionLabel={({ name, location, city }) =>
        `${name} - ${location ? `${city}, ${location.substring(3)}` : ''}`
      }
      getOptionValue={club => club.id}
      isClearable
      loadOptions={(input, callback) => {
        return !input ? Promise.resolve([]) : fetchClubs(input, callback);
      }}
      noOptionsMessage={({ inputValue }) =>
        inputValue.length
          ? `Oops, we can't find a club called "${inputValue}"`
          : 'Enter your club name'
      }
      onChange={club => onChange(club.id)}
      placeholder="Enter your club name"
    />
  );
};

ClubSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ClubSelect;

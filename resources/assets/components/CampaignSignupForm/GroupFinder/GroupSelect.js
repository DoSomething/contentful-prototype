import React from 'react';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useApolloClient } from '@apollo/react-hooks';

const SEARCH_GROUPS_QUERY = gql`
  query SearchGroupsQuery(
    $groupTypeId: Int!
    $name: String!
    $location: String
  ) {
    groups(groupTypeId: $groupTypeId, name: $name, location: $location) {
      id
      name
      city
      location
    }
  }
`;

const GroupSelect = ({
  groupLabel,
  groupLocation,
  groupTypeId,
  onChange,
  onFocus,
}) => {
  /**
   * This is copied by example from the blocks/CurrentSchoolBlock/SchoolSelect, which has comments
   * detailing debouncing the useApolloClient hook (AsyncSelect loadOptions expects a Promise).
   */
  const client = useApolloClient();

  const fetchGroups = debounce((searchString, callback) => {
    const variables = {
      groupTypeId,
      name: searchString,
    };

    if (groupLocation) {
      variables.location = groupLocation;
    }

    client
      .query({ query: SEARCH_GROUPS_QUERY, variables })
      .then(result => callback(result.data.groups))
      .catch(error => callback(error));
  }, 250);

  /**
   * Passing id and instanceId props to the Select for use in our Cypress tests.
   * @see https://react-select.com/props#select-props
   */
  return (
    <AsyncSelect
      getOptionLabel={group =>
        group.city
          ? `${group.name} - ${group.city}, ${group.location.substring(3)}`
          : group.name
      }
      getOptionValue={group => group.id}
      key={groupLocation}
      id="select-group-dropdown"
      instanceId="select-group-"
      isClearable
      loadOptions={(input, callback) => {
        if (!input) {
          return Promise.resolve([]);
        }
        return fetchGroups(input, callback);
      }}
      noOptionsMessage={({ inputValue }) =>
        inputValue.length
          ? `Oops, we can't find a ${groupLabel} called "${inputValue}"`
          : `Enter your ${groupLabel} name`
      }
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

GroupSelect.propTypes = {
  groupLabel: PropTypes.string.isRequired,
  groupLocation: PropTypes.string,
  groupTypeId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

GroupSelect.defaultProps = {
  groupLocation: null,
};

export default GroupSelect;

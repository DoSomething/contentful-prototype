import React from 'react';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useApolloClient } from '@apollo/react-hooks';

const SEARCH_GROUPS_QUERY = gql`
  query SearchGroupsQuery($groupTypeId: Int!, $name: String!) {
    groups(groupTypeId: $groupTypeId, name: $name) {
      id
      name
    }
  }
`;

const GroupSelect = ({ groupTypeId, onChange }) => {
  /**
   * This is copied by example from the blocks/CurrentSchoolBlock/SchoolSelect, which has comments
   * detailing debouncing the useApolloClient hook (AsyncSelect loadOptions expects a Promise).
   */
  const client = useApolloClient();

  const fetchGroups = debounce((searchString, callback) => {
    client
      .query({
        query: SEARCH_GROUPS_QUERY,
        variables: {
          groupTypeId,
          name: searchString,
        },
      })
      .then(result => callback(result.data.groups))
      .catch(error => callback(error));
  }, 250);

  /**
   * Passing id and instanceId props to the Select for use in our Cypress tests.
   * @see https://react-select.com/props#select-props
   */
  return (
    <AsyncSelect
      getOptionLabel={group => group.name}
      getOptionValue={group => group.id}
      id="select-group-dropdown"
      instanceId="select-group-"
      loadOptions={(input, callback) => {
        if (!input) {
          return Promise.resolve([]);
        }
        return fetchGroups(input, callback);
      }}
      noOptionsMessage={() => 'Enter your chapter name'}
      onChange={onChange}
    />
  );
};

GroupSelect.propTypes = {
  groupTypeId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupSelect;

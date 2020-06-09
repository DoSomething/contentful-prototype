import React from 'react';
import gql from 'graphql-tag';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Spinner from '../artifacts/Spinner/Spinner';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';

/**
 * Note: eventually we'll need to query by the group name, once we have more than 20 results
 * in a list of groups. Will also want to debounce search (see CurrentSchoolBlock).
 */
const SEARCH_GROUPS_QUERY = gql`
  query SearchGroupsQuery($groupTypeId: Int!) {
    groups(groupTypeId: $groupTypeId) {
      id
      name
    }
  }
`;

const GroupSelect = ({ groupTypeId, onChange }) => {
  const { loading, error, data } = useQuery(SEARCH_GROUPS_QUERY, {
    variables: { groupTypeId },
  });

  if (loading) {
    return <Spinner className="flex justify-center p-3" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  /**
   * Passing id and instanceId props to the Select for use in our Cypress tests.
   * @see https://react-select.com/props#select-props
   */
  return (
    <Select
      id="select-group-dropdown"
      instanceId="select-group-"
      onChange={onChange}
      options={data.groups.map(group => ({
        value: group.id,
        label: group.name,
      }))}
    />
  );
};

GroupSelect.propTypes = {
  groupTypeId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupSelect;

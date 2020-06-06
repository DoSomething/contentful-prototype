import React from 'react';
import gql from 'graphql-tag';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Card from '../utilities/Card/Card';
import Placeholder from '../utilities/Placeholder';
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
    return <Placeholder />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return (
    <Card title="Join a group" className="rounded bordered">
      <div className="p-3">
        <Select
          onChange={onChange}
          options={data.groups.map(group => ({
            value: group.id,
            label: group.name,
          }))}
        />
      </div>
    </Card>
  );
};

GroupSelect.propTypes = {
  groupTypeId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupSelect;

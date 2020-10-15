import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ActionStatsTable from './ActionStatsTable';
import SchoolSelect from '../../utilities/SchoolSelect';
import ActionStatsLeaderboard from './ActionStatsLeaderboard';
import SchoolLocationSelect from '../../utilities/UsaStateSelect';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    filterByActionId: actionId
    filterByGroupTypeId: groupTypeId
  }
`;

const ActionStatsBlock = ({ filterByActionId, filterByGroupTypeId }) => {
  const [schoolId, setSchoolId] = useState(null);
  const [schoolLocation, setSchoolLocation] = useState(null);

  return (
    <>
      <ActionStatsLeaderboard
        actionId={filterByActionId}
        groupTypeId={filterByGroupTypeId}
      />

      <div className="flex bg-gray-100 flex-wrap py-8 px-4 md:px-20 lg:px-4 border border-solid border-gray-200">
        <div className="w-full lg:w-1/5">
          <SchoolLocationSelect
            isClearable
            onChange={selected =>
              setSchoolLocation(selected ? selected.value : null)
            }
          />
        </div>

        <div className="w-full py-3 lg:w-2/5 lg:px-3 lg:py-0">
          <SchoolSelect
            onChange={school => setSchoolId(school ? school.id : null)}
            schoolLocation={schoolLocation}
          />
        </div>

        <div className="w-full lg:w-2/5 text-sm text-gray-600">
          If your school has <span className="font-bold">0 registrations</span>,
          it won’t show up in the leaderboard. Email alisha@dosomething.org for
          help.
        </div>
      </div>

      <ActionStatsTable
        actionId={filterByActionId}
        groupTypeId={filterByGroupTypeId}
        schoolId={schoolId}
        schoolLocation={schoolLocation}
      />
    </>
  );
};

ActionStatsBlock.propTypes = {
  filterByActionId: PropTypes.number.isRequired,
  filterByGroupTypeId: PropTypes.number,
};

ActionStatsBlock.defaultProps = {
  filterByGroupTypeId: null,
};

export default ActionStatsBlock;

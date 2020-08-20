import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ActionStatsTable from './ActionStatsTable';
import ActionStatsLeaderboard from './ActionStatsLeaderboard';
import SchoolSelect from '../CurrentSchoolBlock/SchoolSelect';
import SchoolLocationSelect from '../../utilities/UsaStateSelect';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    filterByActionId: actionId
  }
`;

const ActionStatsBlock = ({ filterByActionId }) => {
  const [schoolId, setSchoolId] = useState(null);
  const [schoolLocation, setSchoolLocation] = useState(null);

  return (
    <>
      <ActionStatsLeaderboard actionId={filterByActionId} />

      <div className="flex bg-gray-100 flex-wrap py-8 px-4 border border-solid border-gray-400">
        <div className="w-full lg:w-1/5">
          <SchoolLocationSelect
            isClearable
            onChange={selected =>
              setSchoolLocation(selected ? selected.value : null)
            }
          />
        </div>

        <div className="w-full lg:w-2/5">
          <SchoolSelect
            schoolLocation={schoolLocation}
            onChange={school => setSchoolId(school ? school.id : null)}
          />
        </div>

        <div className="w-full lg:w-2/5">
          If your school has <span className="font-bold">0 registrations</span>,
          it won’t show up in the leaderboard. Email tej@dosomething.org for
          help.
        </div>
      </div>

      <ActionStatsTable
        actionId={filterByActionId}
        schoolId={schoolId}
        schoolLocation={schoolLocation}
      />
    </>
  );
};

ActionStatsBlock.propTypes = {
  filterByActionId: PropTypes.number.isRequired,
};

export default ActionStatsBlock;

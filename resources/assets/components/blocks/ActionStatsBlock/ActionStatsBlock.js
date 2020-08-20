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

      <div className="flex pb-3">
        <div className="flex-1">
          <SchoolLocationSelect
            isClearable
            onChange={selected =>
              setSchoolLocation(selected ? selected.value : null)
            }
          />
        </div>

        <div className="flex-1">
          <SchoolSelect
            schoolLocation={schoolLocation}
            onChange={school => setSchoolId(school ? school.id : null)}
          />
        </div>

        <div className="flex-1">
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

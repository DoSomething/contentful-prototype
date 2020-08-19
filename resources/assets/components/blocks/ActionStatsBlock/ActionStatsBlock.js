import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ActionStatsTable from './ActionStatsTable';
import ActionStatsLeaderboard from './ActionStatsLeaderboard';
import SelectLocationDropdown from '../../utilities/SelectLocationDropdown/SelectLocationDropdown';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    filterByActionId: actionId
  }
`;

const ActionStatsBlock = ({ filterByActionId }) => {
  const [schoolLocation, setSchoolLocation] = useState(null);

  return (
    <>
      <ActionStatsLeaderboard actionId={filterByActionId} />

      <div className="md:w-1/4 pb-3">
        <SelectLocationDropdown
          locationList="domestic"
          onSelect={event => setSchoolLocation(event.target.value)}
          selectedOption={schoolLocation || ''}
        />
      </div>

      <ActionStatsTable
        actionId={filterByActionId}
        schoolLocation={schoolLocation}
      />
    </>
  );
};

ActionStatsBlock.propTypes = {
  filterByActionId: PropTypes.number.isRequired,
};

export default ActionStatsBlock;

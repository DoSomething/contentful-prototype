import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ActionStatsTable from './ActionStatsTable';
import SchoolSelect from '../CurrentSchoolBlock/SchoolSelect';
import SelectLocationDropdown from '../../utilities/SelectLocationDropdown/SelectLocationDropdown';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    filterByActionId: actionId
  }
`;

const ActionStatsBlock = ({ filterByActionId }) => {
  const [schoolLocation, setSchoolLocation] = useState(null);
  const [schoolId, setSchoolId] = useState(null);

  return (
    <>
      <div className="flex pb-3">
        <div className="w-1/4 pb-3">
          <SelectLocationDropdown
            locationList="domestic"
            onSelect={event => setSchoolLocation(event.target.value)}
            selectedOption={schoolLocation || ''}
          />
        </div>

        {schoolLocation ? (
          <div className="w-1/4 pb-3">
            <SchoolSelect
              schoolState={schoolLocation.substring(3)}
              onChange={school => setSchoolId(school ? school.id : null)}
            />
          </div>
        ) : null}
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

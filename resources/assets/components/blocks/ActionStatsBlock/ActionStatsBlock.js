import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ActionStatsTable from './ActionStatsTable';
import SelectLocationDropdown from '../../utilities/SelectLocationDropdown/SelectLocationDropdown';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    filterByActionId: actionId
  }
`;

const ActionStatsBlock = ({ filterByActionId }) => {
  const [location, setLocation] = useState(null);

  return (
    <>
      <div className="w-1/4 pb-3">
        <SelectLocationDropdown
          locationList="domestic"
          onSelect={event => setLocation(event.target.value)}
          selectedOption={location || ''}
        />
      </div>

      <ActionStatsTable actionId={filterByActionId} location={location} />
    </>
  );
};

ActionStatsBlock.propTypes = {
  filterByActionId: PropTypes.number.isRequired,
};

export default ActionStatsBlock;

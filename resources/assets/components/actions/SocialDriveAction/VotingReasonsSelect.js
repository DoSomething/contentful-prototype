import PropTypes from 'prop-types';
import { concat, pull } from 'lodash';
import React, { useState } from 'react';

import { votingReasons } from '../config';

console.log(votingReasons);

const VotingReasons = ({ onSelect }) => {
  const [selectedVotingReasons, setSelectedVotingReasons] = useState([]);

  return (
    <div>
      {Object.keys(votingReasons).map(votingReason => (
        <div>
          <input
            type="checkbox"
            key={votingReason}
            id={votingReason}
            name={votingReason}
            value={votingReason}
            onChange={event => {
              const value = event.target.name;
              setSelectedVotingReasons(
                event.target.checked
                  ? concat(selectedVotingReasons, value)
                  : pull(selectedVotingReasons, value),
              );
              onSelect(selectedVotingReasons);
            }}
          />
          <label htmlFor={votingReason}>{votingReasons[votingReason]}</label>
        </div>
      ))}
    </div>
  );
};

VotingReasons.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default VotingReasons;

import PropTypes from 'prop-types';
import { concat, pull } from 'lodash';
import React, { useState } from 'react';

import { votingReasons } from '../config';

const VotingReasons = ({ onSelect }) => {
  const [selectedVotingReasons, setSelectedVotingReasons] = useState([]);

  return (
    <div className="p-3">
      <div className="pb-3">
        Urge your friend to vote based on the causes you care about most.
      </div>
      <div className="font-bold pb-3">Select causes (optional):</div>
      {Object.keys(votingReasons).map(votingReason => (
        <div key={votingReason} className="pb-1">
          <input
            type="checkbox"
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
              onSelect(`voting-reasons=${selectedVotingReasons.join(',')}`);
            }}
          />
          <label className="pl-1" htmlFor={votingReason}>
            {votingReasons[votingReason]}
          </label>
        </div>
      ))}
    </div>
  );
};

VotingReasons.propTypes = {
  onSelect: PropTypes.func,
};

VotingReasons.defaultProps = {
  onSelect: PropTypes.null,
};

export default VotingReasons;

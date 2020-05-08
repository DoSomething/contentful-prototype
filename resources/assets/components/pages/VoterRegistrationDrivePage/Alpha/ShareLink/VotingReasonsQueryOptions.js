import { without } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { votingReasons } from '../config';

const VotingReasons = ({ onChange }) => {
  const [selectedVotingReasons, setSelectedVotingReasons] = useState([]);

  useEffect(() => {
    onChange(
      selectedVotingReasons.length
        ? `voting-reasons=${selectedVotingReasons.join(',')}`
        : null,
    );
  }, [selectedVotingReasons]);

  return (
    <div className="pl-3 pr-3">
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
                  ? [...selectedVotingReasons, value]
                  : without(selectedVotingReasons, value),
              );
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
  onChange: PropTypes.func.isRequired,
};

export default VotingReasons;

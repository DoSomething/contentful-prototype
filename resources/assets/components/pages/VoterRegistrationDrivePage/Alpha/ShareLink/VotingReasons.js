import PropTypes from 'prop-types';
import { concat, pull } from 'lodash';
import React, { useState } from 'react';

import { votingReasons } from '../config';

console.log(votingReasons);

const VotingReasons = ({ onSelect }) => {
  const [selectedVotingReasons, setSelectedVotingReasons] = useState([]);

  return (
    <>
      {Object.keys(votingReasons).map(votingReason => (
        <div key={votingReason}>
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
          <label htmlFor={votingReason}>{votingReasons[votingReason]}</label>
        </div>
      ))}
    </>
  );
};

VotingReasons.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default VotingReasons;

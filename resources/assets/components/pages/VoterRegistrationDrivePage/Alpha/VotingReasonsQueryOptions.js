import { without } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { votingReasons } from './config';

const VotingReasonsQueryOptions = ({ onChange }) => {
  const [selectedVotingReasons, setSelectedVotingReasons] = useState([]);

  useEffect(() => {
    onChange(
      selectedVotingReasons.length
        ? `voting-reasons=${selectedVotingReasons.join(',')}`
        : null,
    );
  }, [selectedVotingReasons]);

  const checkboxes = Object.keys(votingReasons).map(votingReason => (
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
  ));

  const numCheckboxes = checkboxes.length;

  return (
    <div className="pl-3 pr-3" data-test="voting-reasons-query-options">
      <div className="font-bold pb-3">Select causes (optional):</div>
      <div className="flex items-stretch flex:grow flex-col md:flex-row">
        <div className="flex-1">
          {checkboxes.slice(0, numCheckboxes / 2 + 1).map(checkbox => checkbox)}
        </div>
        <div className="flex-1">
          {checkboxes
            .slice(numCheckboxes / 2 + 1, numCheckboxes)
            .map(checkbox => checkbox)}
        </div>
      </div>
    </div>
  );
};

VotingReasonsQueryOptions.propTypes = {
  onChange: PropTypes.func,
};

VotingReasonsQueryOptions.defaultProps = {
  onChange: null,
};

export default VotingReasonsQueryOptions;

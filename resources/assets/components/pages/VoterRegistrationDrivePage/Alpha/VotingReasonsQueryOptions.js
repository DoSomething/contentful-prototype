import { without } from 'lodash';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
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

  const votingReasonsStyle = css`
    #voting-reasons-query-options {
      display: flex;
      flex-wrap: wrap;

      .voting-reasons-query-option {
        width: 100%;
      }

      @include media($medium) {
        div {
          flex: 0 50%;
        }
      }
    }
  `;

  return (
    <div
      className="pl-3 pr-3"
      css={votingReasonsStyle}
      data-test="voting-reasons-query-options"
    >
      <div className="font-bold pb-3">Select causes (optional):</div>
      <div id="voting-reasons-query-options">
        {Object.keys(votingReasons).map(votingReason => (
          <div key={votingReason} className="pb-1 voting-reasons-query-option">
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
    </div>
  );
};

VotingReasonsQueryOptions.propTypes = {
  onChange: PropTypes.func,
};

VotingReasonsQueryOptions.defaultProps = {
  onChange: () => {},
};

export default VotingReasonsQueryOptions;

import { without } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const votingReasons = {
  'racial-justice': 'Racial Justice',
  'climate-change': 'Climate Change',
  'gun-violence': 'Gun Violence',
  'mental-health': 'Mental Health',
  'student-debt': 'Student Debt',
  'covid-relief': 'COVID-19 Relief',
  'immigration-reform': 'Immigration Reform',
  healthcare: 'Healthcare',
  'lgbtq-rights': 'LGBTQ+ Rights',
  'homelessness-and-poverty': 'Homelessness & Poverty',
  education: 'Education Reform',
  'gender-equality': 'Gender Equality',
};

const QueryOptions = ({ onChange }) => {
  const [selectedVotingReasons, setSelectedVotingReasons] = useState([]);

  useEffect(() => {
    onChange(
      selectedVotingReasons.length
        ? { 'voting-reasons': selectedVotingReasons.join(',') }
        : null,
    );
  }, [selectedVotingReasons]);

  return (
    <div className="pl-3 pr-3" data-test="voting-reasons-query-options">
      <div className="font-bold pb-3">Select causes (optional):</div>
      <div className="md:grid md:grid-cols-2">
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

QueryOptions.propTypes = {
  onChange: PropTypes.func,
};

QueryOptions.defaultProps = {
  onChange: () => {},
};

export default QueryOptions;

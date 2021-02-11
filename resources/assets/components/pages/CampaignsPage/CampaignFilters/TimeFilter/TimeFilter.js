import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import ElementButton from '../../../../utilities/Button/ElementButton';

// for 02.11.2021
// double check the double quotes are pulling campaigns correctly
// should they be added in the setFilters func vs setting them below

const timeCommitmentLabels = {
  "'<0.083'": '< 5 minutes',
  "'<0.5'": '< 30 minutes',
  '0.5-1.0': '30 minutes - 1 hour',
  '1.0-3.0': '1 - 3 hours',
  '3.0+': '3+ hours',
};

/**
 * Checkbox input component.
 *
 * @param {Object}
 */
const TimeInput = ({
  timeCommitmentName,
  timeCommitmentValue,
  handleSelect,
  isChecked,
}) => (
  <label
    className="flex items-start justify-start pb-2"
    htmlFor={timeCommitmentValue}
  >
    <input
      id={timeCommitmentValue}
      checked={isChecked}
      className="mt-1"
      name={timeCommitmentValue}
      onChange={handleSelect}
      type="checkbox"
      value={timeCommitmentValue}
    />
    <span className="pl-4">{timeCommitmentName}</span>
  </label>
);

TimeInput.propTypes = {
  isChecked: PropTypes.bool,
  handleSelect: PropTypes.func.isRequired,
  timeCommitmentName: PropTypes.string.isRequired,
  timeCommitmentValue: PropTypes.string.isRequired,
};

TimeInput.defaultProps = {
  isChecked: false,
};

/**
 * Filter menu form with series of checkbox inputs.
 *
 * @param {Object}
 */
const TimeFilter = ({ filters, setFilters }) => {
  const timeCommitments = get(filters, 'time', []);

  const handleTimeCommitmentSelect = event => {
    if (timeCommitments.includes(event.target.value)) {
      const newtimeCommitments = timeCommitments.filter(timeCommitment => {
        return timeCommitment !== event.target.value;
      });

      setFilters({
        ...filters,
        time: [...newtimeCommitments],
      });
    } else {
      setFilters({
        ...filters,
        time: [...timeCommitments, event.target.value],
      });
    }
  };

  const clearAllSelected = () => {
    if (timeCommitments) {
      setFilters({
        ...filters,
        time: [],
      });
    }
  };

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4">
        <div className="mb-6 lg:mb-0 lg:grid lg:grid-cols-2 lg:col-span-2">
          {Object.keys(timeCommitmentLabels).map(timeCommitmentLabel => {
            return (
              <TimeInput
                key={timeCommitmentLabel}
                handleSelect={handleTimeCommitmentSelect}
                timeCommitmentName={timeCommitmentLabels[timeCommitmentLabel]}
                timeCommitmentValue={timeCommitmentLabel}
                isChecked={timeCommitments.includes(timeCommitmentLabel)}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full flex justify-start py-2">
        <ElementButton
          className="font-bold p-2 text-blue-500 hover:text-blue-300"
          text="clear"
          onClick={clearAllSelected}
        />
      </div>
    </form>
  );
};

TimeFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default TimeFilter;

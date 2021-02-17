import React from 'react';
import PropTypes from 'prop-types';

/**
 * Checkbox input component.
 *
 * @param {Object}
 */
const FilterInput = ({ filterName, filterValue, handleSelect, isChecked }) => (
  <label className="flex items-start justify-start pb-2" htmlFor={filterValue}>
    <input
      id={filterValue}
      checked={isChecked}
      className="mt-1"
      name={filterValue}
      onChange={handleSelect}
      type="checkbox"
      value={filterValue}
    />

    <span className="pl-4">{filterName}</span>
  </label>
);

FilterInput.propTypes = {
  isChecked: PropTypes.bool,
  handleSelect: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
};

FilterInput.defaultProps = {
  isChecked: false,
};

export default FilterInput;

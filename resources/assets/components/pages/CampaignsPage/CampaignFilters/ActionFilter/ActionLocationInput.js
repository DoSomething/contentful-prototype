import React from 'react';
import PropTypes from 'prop-types';

export const actionLocationLabels = {
  'in-person': 'In Person',
  online: 'Online',
};

/**
 * Checkbox input component.
 *
 * @param {Object}
 */
const ActionLocationInput = ({
  actionLocationName,
  actionLocationValue,
  handleSelect,
  isChecked,
}) => (
  <label
    className="flex items-start justify-start pb-2"
    htmlFor={actionLocationValue}
  >
    <input
      id={actionLocationValue}
      checked={isChecked}
      className="mt-1"
      name={actionLocationValue}
      onChange={handleSelect}
      type="checkbox"
      value={actionLocationValue}
    />
    <span className="pl-4">{actionLocationName}</span>
  </label>
);

ActionLocationInput.propTypes = {
  isChecked: PropTypes.bool,
  actionLocationName: PropTypes.string.isRequired,
  actionLocationValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

ActionLocationInput.defaultProps = {
  isChecked: false,
};

export default ActionLocationInput;

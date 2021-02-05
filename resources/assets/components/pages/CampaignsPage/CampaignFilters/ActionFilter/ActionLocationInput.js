import React from 'react';
import PropTypes from 'prop-types';

export const actionLocationLabels = {
  'animal-welfare': 'Animal Welfare',
  bullying: 'Bullying',
  education: 'Education',
  environment: 'Environment',
  'gender-rights': 'Gender Rights & Equality',
  'homelessness-and-poverty': 'Homelessness & Poverty',
  immigration: 'Immigration & Refugees',
  'lgbtq-rights': 'LGBTQ+ Rights & Equality',
  'mental-health': 'Mental Health',
  'physical-health': 'Physical Health',
  'racial-justice': 'Racial Justice & Equity',
  'sexual-harassment': 'Sexual Harassment & Assault',
};

/**
 * Checkbox input component.
 *
 * @param {Object}
 */
const ActionLocationInput = ({
  causeName,
  causeValue,
  handleSelect,
  isChecked,
}) => (
  <label className="flex items-start justify-start pb-2" htmlFor={causeValue}>
    <input
      id={causeValue}
      checked={isChecked}
      className="mt-1"
      name={causeValue}
      onChange={handleSelect}
      type="checkbox"
      value={causeValue}
    />
    <span className="pl-4">{causeName}</span>
  </label>
);

ActionLocationInput.propTypes = {
  isChecked: PropTypes.bool,
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

ActionLocationInput.defaultProps = {
  isChecked: false,
};

export default ActionLocationInput;

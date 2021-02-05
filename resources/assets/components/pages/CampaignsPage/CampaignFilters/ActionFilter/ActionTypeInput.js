import React from 'react';
import PropTypes from 'prop-types';

export const actionTypeLabels = {
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
const ActionTypeInput = ({
  actionTypeName,
  actionTypeValue,
  handleSelect,
  isChecked,
}) => (
  <label
    className="flex items-start justify-start pb-2"
    htmlFor={actionTypeValue}
  >
    <input
      id={actionTypeValue}
      checked={isChecked}
      className="mt-1"
      name={actionTypeValue}
      onChange={handleSelect}
      type="checkbox"
      value={actionTypeValue}
    />
    <span className="pl-4">{actionTypeName}</span>
  </label>
);

ActionTypeInput.propTypes = {
  isChecked: PropTypes.bool,
  actionTypeName: PropTypes.string.isRequired,
  actionTypeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

ActionTypeInput.defaultProps = {
  isChecked: false,
};

export default ActionTypeInput;

import React from 'react';
import PropTypes from 'prop-types';

export const actionLocationLabels = {
<<<<<<< HEAD
  'in-person': 'In Person',
  online: 'Online',
=======
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
>>>>>>> updates type and location files
};

/**
 * Checkbox input component.
 *
 * @param {Object}
 */
const ActionLocationInput = ({
<<<<<<< HEAD
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
=======
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
>>>>>>> updates type and location files
  </label>
);

ActionLocationInput.propTypes = {
  isChecked: PropTypes.bool,
<<<<<<< HEAD
  actionLocationName: PropTypes.string.isRequired,
  actionLocationValue: PropTypes.string.isRequired,
=======
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
>>>>>>> updates type and location files
  handleSelect: PropTypes.func.isRequired,
};

ActionLocationInput.defaultProps = {
  isChecked: false,
};

export default ActionLocationInput;

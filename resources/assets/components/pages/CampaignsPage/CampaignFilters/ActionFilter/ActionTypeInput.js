import React from 'react';
import PropTypes from 'prop-types';

export const actionTypeLabels = {
<<<<<<< HEAD
  'attend-event': 'Attend an Event',
  'collect-something': 'Collect Something',
  'contact-decisionmaker': 'Contact a Decision-Maker',
  'donate-something': 'Donate Something',
  'flag-content': 'Flag Content',
  'have-a-conversation': 'Have A Conversation',
  'host-event': 'Host An Event',
  'make-something': 'Make Something',
  'share-something': 'Share Something',
  'sign-petition': 'Sign A Petition',
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

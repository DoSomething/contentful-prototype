import React from 'react';
import PropTypes from 'prop-types';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

/**
 * Checkbox input component.
 *
 * @param  {String} name
 * @param  {String} inputValue
 */
export const trackClickedFilterOptionsAnalyticsEvent = (name, inputValue) => {
  trackAnalyticsEvent(`clicked_filter_options_${name}`, {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.filter,
    label: inputValue,
    context: { value: inputValue },
  });
};

/**
 * Checkbox input component.
 *
 * @param  {String} name
 */
export const trackClickedFilterClearOptionsAnalyticsEvent = name => {
  trackAnalyticsEvent(`clicked_filter_clear_options_${name}`, {
    action: 'link_clicked',
    category: EVENT_CATEGORIES.filter,
    label: `${name}`,
  });
};

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

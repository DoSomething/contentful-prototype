import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import ElementButton from '../../../../utilities/Button/ElementButton';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../../helpers/analytics';

const causeLabels = {
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
const CauseInput = ({ causeName, causeValue, handleSelect, isChecked }) => (
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

CauseInput.propTypes = {
  isChecked: PropTypes.bool,
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

CauseInput.defaultProps = {
  isChecked: false,
};

/**
 * Filter menu form with series of checkbox inputs.
 *
 * @param {Object}
 */
const CauseFilter = ({ filters, setFilters }) => {
  const causes = get(filters, 'causes', []);

  const handleCauseSelect = event => {
    trackAnalyticsEvent('clicked_filter_options_cause', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.filter,
      label: event.target.value,
      context: { value: event.target.value },
    });

    if (causes.includes(event.target.value)) {
      const newCauses = causes.filter(cause => {
        return cause !== event.target.value;
      });
      setFilters({ ...filters, causes: [...newCauses] });
    } else {
      setFilters({ ...filters, causes: [...causes, event.target.value] });
    }
  };

  const clearAllSelected = () => {
    trackAnalyticsEvent('clicked_filter_clear_options_cause', {
      action: 'link_clicked',
      category: EVENT_CATEGORIES.filter,
      label: 'cause',
    });

    if (causes) {
      setFilters({ ...filters, causes: [] });
    }
  };

  return (
    <form>
      <div className="cause-filter w-full p-4 flex flex-col flex-wrap">
        {Object.keys(causeLabels).map(cause => {
          return (
            <CauseInput
              key={cause}
              handleSelect={handleCauseSelect}
              causeName={causeLabels[cause]}
              causeValue={cause}
              isChecked={causes.includes(cause)}
            />
          );
        })}
      </div>

      <div className="w-full flex justify-start py-2 px-4">
        <ElementButton
          className="font-bold p-2 text-blue-500 hover:text-blue-300"
          text="clear"
          onClick={clearAllSelected}
        />
      </div>
    </form>
  );
};

CauseFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default CauseFilter;

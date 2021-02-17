import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import FilterInput from '../FilterInput';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../../helpers/analytics';
import ElementButton from '../../../../utilities/Button/ElementButton';

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
            <FilterInput
              key={cause}
              handleSelect={handleCauseSelect}
              filterName={causeLabels[cause]}
              filterValue={cause}
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

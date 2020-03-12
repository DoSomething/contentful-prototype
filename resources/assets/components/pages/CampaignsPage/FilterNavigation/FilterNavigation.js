import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import FilterSubNav from './FilterSubNav';
import MenuButton from '../../../utilities/MenuButton/MenuButton';

const FilterNavigation = ({ filters, setFilters }) => {
  const [chosenFilter, setChosenFilter] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleMenuToggle = filterName => {
    trackAnalyticsEvent(`clicked_filter_button_${filterName}`, {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.filter,
      label: `${filterName.toLowerCase()}_filter_menu`,
    });

    if (chosenFilter) {
      setChosenFilter('');
      document.getElementById(filterName).blur();
    } else {
      document.getElementById(filterName).focus();
      setChosenFilter(filterName);
    }
    setShowFilterMenu(!showFilterMenu);
  };

  return (
    <div className="md:w-full bg-white">
      <div className="flex items-center md:w-3/4 mx-auto pt-2 md:pt-0 pb-6 pl-6 md:pl-0">
        <h2 className="text-gray-600 pr-4 text-base uppercase">Filters</h2>
        <MenuButton
          title="Cause"
          onClick={handleMenuToggle}
          className={
            chosenFilter
              ? 'bg-blurple-500 text-white border border-solid border-blurple-500'
              : 'bg-white border border-solid border-blurple-500 text-blurple-500'
          }
        />
      </div>
      <div
        className={chosenFilter ? 'border-solid border-t border-gray-300' : ''}
      >
        <div className="md:w-3/4 mx-auto pl-6 md:pl-0">
          <FilterSubNav
            handleMenuToggle={handleMenuToggle}
            chosenFilter={chosenFilter}
            filters={filters}
            setFilters={setFilters}
            className={!chosenFilter ? 'hidden' : ''}
          />
        </div>
      </div>
    </div>
  );
};

FilterNavigation.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterNavigation;

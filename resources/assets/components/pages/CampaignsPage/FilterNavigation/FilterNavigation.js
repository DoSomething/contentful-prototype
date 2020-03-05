import PropTypes from 'prop-types';
import React, { useState } from 'react';

import FilterSubNav from './FilterSubNav';
import MenuButton from '../../../utilities/MenuButton/MenuButton';

const FilterNavigation = ({ filters, setFilters }) => {
  const [chosenFilter, setChosenFilter] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleMenuToggle = filterName => {
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
      <div className="flex items-center filter-nav md:w-3/4 mx-auto pl-6 md:pl-0 pt-2 md:pt-0 pb-6">
        <h2 className="gray-filter-nav pr-4 text-base uppercase">Filters</h2>
        <MenuButton
          title="Cause"
          onClick={handleMenuToggle}
          hideCarat
          className={
            chosenFilter
              ? 'bg-blurple-500 color-white border border-solid border-blurple-500'
              : 'bg-white border border-solid border-blurple-500 filter-nav-button'
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

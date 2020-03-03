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
    } else {
      setChosenFilter(filterName);
    }
    setShowFilterMenu(!showFilterMenu);
  };

  return (
    <div className="campaigns-page-filters w-full pl-6 md:pl-0 mb-6 z-50 bg-white">
      <div className="base-12-grid items-center filter-nav">
        <h6 className="color-gray-200">FILTERS</h6>
        <MenuButton
          title="Cause"
          onClick={handleMenuToggle}
          hideCarat
          titleColor={chosenFilter ? 'color-white' : 'filter-nav-button'}
          className={
            chosenFilter
              ? 'bg-blurple-500 border-none'
              : 'bg-white border border-solid border-blurple-500'
          }
        />
      </div>

      <FilterSubNav
        handleMenuToggle={handleMenuToggle}
        chosenFilter={chosenFilter}
        filters={filters}
        setFilters={setFilters}
        className={!chosenFilter ? 'hidden' : ''}
      />
    </div>
  );
};

FilterNavigation.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterNavigation;

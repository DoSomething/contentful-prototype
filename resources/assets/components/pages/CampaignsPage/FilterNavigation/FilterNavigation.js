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
      <MenuButton
        title="Causes"
        onClick={handleMenuToggle}
        toggleCarat={Boolean(chosenFilter)}
        className={
          chosenFilter ? 'bg-white border-none shadow-lg rounded-b-none' : ''
        }
      />

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

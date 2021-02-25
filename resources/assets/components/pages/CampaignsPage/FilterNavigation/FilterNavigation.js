import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { css } from '@emotion/core';
import React, { useState } from 'react';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import FilterSubNav from './FilterSubNav';
import MenuCarat from '../../../artifacts/MenuCarat/MenuCarat';
import SecondaryButton from '../../../utilities/Button/SecondaryButton';

const FilterNavigation = ({ filters, setFilters }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filterCategoryNames = Object.keys(filters).map(filter =>
    pluralize.singular(filter),
  );

  const caratToggle = css`
    transform: rotate(180deg);
  `;

  const handleMenuToggle = event => {
    const selectedFilter = event.target.dataset.filter;

    trackAnalyticsEvent(`clicked_filter_button_${selectedFilter}`, {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.filter,
      label: `${selectedFilter}_filter_menu`,
    });

    if (activeFilter === selectedFilter) {
      return setActiveFilter(null);
    }

    return setActiveFilter(selectedFilter);
  };
  return (
    <div className="md:w-full bg-white">
      <div className="flex items-center md:w-3/4 mx-auto pt-2 pb-6 pl-3 md:pl-0">
        <h2 className="mb-0 pr-4 text-gray-600 text-base uppercase hidden lg:inline">
          Filters
        </h2>

        {filterCategoryNames.map(name => (
          <SecondaryButton
            attributes={{ 'data-filter': name }}
            className="mr-4 lg:mr-8"
            decoration={
              <MenuCarat
                color="#322baa"
                cssStyles={activeFilter === name ? caratToggle : null}
              />
            }
            isActive={activeFilter === name}
            key={`${name}_button`}
            onClick={handleMenuToggle}
            text={startCase(name)}
          />
        ))}
      </div>

      {activeFilter ? (
        <div className="border-solid border-t border-gray-300">
          <div className="md:w-3/4 mx-auto pl-6 md:pl-0">
            <FilterSubNav
              activeFilter={activeFilter}
              filters={filters}
              setFilters={setFilters}
              className={!activeFilter ? 'hidden' : ''}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

FilterNavigation.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterNavigation;

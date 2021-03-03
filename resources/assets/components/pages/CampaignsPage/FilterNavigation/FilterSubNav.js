import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withoutNulls } from '../../../../helpers/data';
import TimeFilter from '../CampaignFilters/TimeFilter/TimeFilter';
import CauseFilter from '../CampaignFilters/CauseFilter/CauseFilter';
import ActionFilter from '../CampaignFilters/ActionFilter/ActionFilter';

const renderedFilterMenu = props => {
  const fields = withoutNulls(props);
  switch (fields.activeFilter) {
    case 'cause':
      return (
        <CauseFilter filters={fields.filters} setFilters={fields.setFilters} />
      );
    case 'action':
      return (
        <ActionFilter filters={fields.filters} setFilters={fields.setFilters} />
      );
    case 'time':
      return (
        <TimeFilter filters={fields.filters} setFilters={fields.setFilters} />
      );

    default:
      return null;
  }
};

const FilterSubNav = props => (
  <div
    className={classNames('w-full bg-white pt-6', props.className)}
    aria-expanded={Boolean(props.activeFilter)}
  >
    {renderedFilterMenu(props)}
  </div>
);

FilterSubNav.propTypes = {
  activeFilter: PropTypes.string,
  className: PropTypes.string,
};

FilterSubNav.defaultProps = {
  activeFilter: '',
  className: null,
};

export default FilterSubNav;

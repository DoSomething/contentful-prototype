import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withoutNulls } from '../../../../helpers';
import CauseFilter from '../CampaignFilters/CauseFilter/CauseFilter';

const renderedFilterMenu = props => {
  const fields = withoutNulls(props);
  switch (fields.chosenFilter) {
    case 'Cause':
      return <CauseFilter {...fields} />;
    default:
      return null;
  }
};

const FilterSubNav = props => (
  <div
    className={classNames('w-full bg-white pt-6', props.className)}
    aria-expanded={Boolean(props.chosenFilter)}
  >
    {renderedFilterMenu(props)}
  </div>
);

FilterSubNav.propTypes = {
  chosenFilter: PropTypes.string,
  className: PropTypes.string,
};

FilterSubNav.defaultProps = {
  chosenFilter: '',
  className: null,
};

export default FilterSubNav;

/** @jsx jsx */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { jsx, css } from '@emotion/core';

import { withoutNulls } from '../../../../helpers';
import CauseFilter from '../CampaignFilters/CauseFilter/CauseFilter';

const isVisible = css`
  display: none;
`;

const renderedFilterMenu = props => {
  const fields = withoutNulls(props);
  switch (fields.chosenFilter) {
    case 'Causes':
      return <CauseFilter {...fields} />;
    default:
      return null;
  }
};

const FilterSubNav = props => (
  <div
    css={!props.chosenFilter ? isVisible : null}
    className={classNames('w-full bg-white', props.className)}
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

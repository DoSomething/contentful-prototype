/** @jsx jsx */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

import { withoutNulls } from '../../../../helpers';
import CauseFilter from '../CampaignFilters/CauseFilter/CauseFilter';

const isVisible = css`
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
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
    css={!props.showFilterMenu ? isVisible : null}
    className="lg:w-1/2 bg-white shadow-lg lg:absolute"
  >
    {renderedFilterMenu(props)}
  </div>
);

FilterSubNav.propTypes = {
  showFilterMenu: PropTypes.bool,
};

FilterSubNav.defaultProps = {
  showFilterMenu: false,
};

export default FilterSubNav;

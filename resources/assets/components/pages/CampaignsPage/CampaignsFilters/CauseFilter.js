/** @jsx jsx */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

import Button from '../../../utilities/Button/Button';

// would it make more sense to have this saved as an env variable? since it def could be re used until the rogue API is updated
const causes = [
  {
    name: 'Animal Welfare',
    value: 'animal-welfare',
    checked: false,
  },
  {
    name: 'Bullying',
    value: 'bullying',
    checked: false,
  },
  {
    name: 'Education',
    value: 'education',
    checked: false,
  },
  {
    name: 'Environment',
    value: 'environment',
    checked: false,
  },
  {
    name: 'Gender Rights & Equality',
    value: 'gender-rights',
    checked: false,
  },
  {
    name: 'Homelessness & Poverty',
    value: 'homelessness-and-poverty',
    checked: false,
  },
  {
    name: 'Immigration & Refugees',
    value: 'immigration',
    checked: false,
  },
  {
    name: 'LGBTQ+ Rights & Equality',
    value: 'lgbtq-rights',
    checked: false,
  },
  {
    name: 'Mental Health',
    value: 'mental-health',
    checked: false,
  },
  {
    name: 'Physical Health',
    value: 'physical-health',
    checked: false,
  },
  {
    name: 'Racial Justice & Equity',
    value: 'racial-justice',
    checked: false,
  },
  {
    name: 'Sexual Harassment & Assault',
    value: 'sexual-harassment',
    checked: false,
  },
];

const CauseInputs = ({ causeName, causeValue, handleSelect }) => (
  <>
    <label className="flex justify-start pb-2" htmlFor={causeName}>
      <input
        name={causeValue}
        id={causeValue}
        type="checkbox"
        value={causeValue}
        onClick={handleSelect}
        // checked={causeChecked}
      />
      <span className="pl-4">{causeName}</span>
    </label>
  </>
);

const isVisible = css`
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
`;

CauseInputs.propTypes = {
  // causeChecked: PropTypes.bool,
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

CauseInputs.defaultProps = {
  // causeChecked: false,
};

const CauseFilter = ({
  clearAll,
  handleFilterToggle,
  handleSelect,
  showFilters,
}) => (
  <div
    css={!showFilters ? isVisible : null}
    className="lg:w-1/3 bg-white shadow-lg lg:absolute z-10000000000"
  >
    <form>
      <div className="w-full p-4 border-0 border-solid rounded-lg border-0">
        {causes.map(cause => {
          return (
            <CauseInputs
              key={cause.value}
              handleSelect={handleSelect}
              causeName={cause.name}
              causeValue={cause.value}
              causeChecked={cause.checked}
            />
          );
        })}
      </div>
      <div className="w-full border-t border-gray-300 border-solid py-2">
        <button
          className="w-1/2 text-right pr-6 focus:outline-none"
          onClick={clearAll}
          type="button"
        >
          <p className="font-bold text-blue-500">clear</p>
        </button>
        <Button onClick={handleFilterToggle}>Show Campaigns</Button>
      </div>
    </form>
  </div>
);

CauseFilter.propTypes = {
  clearAll: PropTypes.func.isRequired,
  handleFilterToggle: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
};

export default CauseFilter;

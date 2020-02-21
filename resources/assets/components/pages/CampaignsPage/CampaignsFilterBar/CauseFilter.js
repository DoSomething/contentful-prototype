/** @jsx jsx */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

// would it make more sense to have this saved as an env variable? since it def could be re used until the rogue API is updated
const causes = [
  {
    name: 'Animal Welfare',
    value: 'animal-welfare',
  },
  {
    name: 'Bullying',
    value: 'bullying',
  },
  {
    name: 'Education',
    value: 'education',
  },
  {
    name: 'Environment',
    value: 'environment',
  },
  {
    name: 'Gender Rights & Equality',
    value: 'gender-rights',
  },
  {
    name: 'Homelessness & Poverty',
    value: 'homelessness-and-poverty',
  },
  {
    name: 'Immigration & Refugees',
    value: 'immigration',
  },
  {
    name: 'LGBTQ+ Rights & Equality',
    value: 'lgbtq-rights',
  },
  {
    name: 'Mental Health',
    value: 'mental-health',
  },
  {
    name: 'Physical Health',
    value: 'physical-health',
  },
  {
    name: 'Racial Justice & Equity',
    value: 'racial-justice',
  },
  {
    name: 'Sexual Harassment & Assault',
    value: 'sexual-harassment',
  },
];

const CauseInputs = ({ causeName, causeValue, handleSelect }) => (
  <>
    <label htmlFor={causeName}>
      <input
        name={causeValue}
        id={causeValue}
        type="checkbox"
        value={causeValue}
        onClick={handleSelect}
      />
      {causeName}
    </label>
  </>
);

const isVisible = css`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
`;

CauseInputs.propTypes = {
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const CauseFilter = ({ clearAll, handleSelect, showFilters }) => (
  <div css={!showFilters ? isVisible : null} className="md:w-1/2">
    <form>
      {causes.map(cause => {
        return (
          <CauseInputs
            key={cause.value}
            handleSelect={handleSelect}
            causeName={cause.name}
            causeValue={cause.value}
          />
        );
      })}
      <button onClick={clearAll} type="button">
        clear
      </button>
    </form>
  </div>
);

CauseFilter.propTypes = {
  clearAll: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
};

export default CauseFilter;

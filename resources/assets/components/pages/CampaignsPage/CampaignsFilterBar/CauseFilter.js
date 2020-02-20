import React from 'react';
import PropTypes from 'prop-types';

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

CauseInputs.propTypes = {
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const CauseFilter = ({ clearAll, handleSelect }) => (
  <div>
    <form className="base-12-grid">
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
};

export default CauseFilter;

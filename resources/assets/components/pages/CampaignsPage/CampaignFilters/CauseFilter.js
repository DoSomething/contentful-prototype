import React from 'react';
import PropTypes from 'prop-types';

import causes from './CauseVariables';
import Button from '../../../utilities/Button/Button';

const CauseInputs = ({ causeChecked, causeName, causeValue, handleSelect }) => (
  <>
    <label className="flex justify-start pb-2" htmlFor={causeName}>
      <input
        name={causeValue}
        id={causeValue}
        type="checkbox"
        value={causeValue}
        onClick={handleSelect}
        checked={causeChecked}
      />
      <span className="pl-4">{causeName}</span>
    </label>
  </>
);

CauseInputs.propTypes = {
  causeChecked: PropTypes.bool,
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

CauseInputs.defaultProps = {
  causeChecked: false,
};

const CauseFilter = ({ clearAll, handleMenuToggle, handleCauseSelect }) => (
  <form>
    <div className="w-full p-4 border-0 border-solid rounded-lg border-0">
      {Object.keys(causes).map(cause => {
        return (
          <CauseInputs
            key={causes[cause].value}
            handleSelect={handleCauseSelect}
            causeName={causes[cause].name}
            causeValue={causes[cause].value}
            causeChecked={causes[cause].checked}
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
      <Button onClick={handleMenuToggle}>Show Campaigns</Button>
    </div>
  </form>
);

CauseFilter.propTypes = {
  clearAll: PropTypes.func.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  handleCauseSelect: PropTypes.func.isRequired,
};

export default CauseFilter;

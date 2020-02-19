import React from 'react';
import PropTypes from 'prop-types';

// object instead of array, also key is the index
const causes = ['Environment', 'Education'];

const CauseInputs = ({ cause, handleSelect }) => (
  <>
    <label htmlFor={cause}>
      <input
        name={cause}
        id={cause}
        type="checkbox"
        value={cause.toLowerCase()}
        onClick={handleSelect}
      />
      {cause}
    </label>
  </>
);

CauseInputs.propTypes = {
  cause: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const CauseFilter = ({ clearAll, handleSelect }) => (
  <div>
    <form className="base-12-grid">
      {causes.map(cause => {
        return <CauseInputs cause={cause} handleSelect={handleSelect} />;
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

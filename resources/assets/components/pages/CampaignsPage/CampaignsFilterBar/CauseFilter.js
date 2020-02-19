import React from 'react';
import PropTypes from 'prop-types';

const CauseFilter = ({ handleSelect, clearAll }) => (
  <div>
    <form className="base-12-grid">
      <label htmlFor="environment">
        <input
          name="environment"
          id="environment"
          type="checkbox"
          value="environment"
          onClick={handleSelect}
        />
        Environment
      </label>
      <label htmlFor="education">
        <input
          name="education"
          id="education"
          type="checkbox"
          value="education"
          onClick={handleSelect}
        />
        Education
      </label>
      <button onClick={clearAll} type="button">
        clear
      </button>
    </form>
  </div>
);

CauseFilter.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
};

export default CauseFilter;

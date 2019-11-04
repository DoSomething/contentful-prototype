import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { UsaStates } from 'usa-states';

const usaStateOptions = new UsaStates().states;

const StateSelect = ({ onChange }) => (
  <Select
    getOptionLabel={usaState => usaState.name}
    getOptionValue={usaState => usaState.abbreviation}
    onChange={onChange}
    options={usaStateOptions}
  />
);

StateSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default StateSelect;

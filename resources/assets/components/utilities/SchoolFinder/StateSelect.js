import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { UsaStates } from 'usa-states';

const stateOptions = new UsaStates().states.map(state => ({
  value: state.abbreviation,
  label: state.name,
}));

const StateSelect = ({ onChange }) => (
  <Select options={stateOptions} onChange={onChange} />
);

StateSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default StateSelect;

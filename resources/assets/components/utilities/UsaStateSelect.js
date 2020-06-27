import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { UsaStates } from 'usa-states';

const usaStateOptions = new UsaStates().states;

const UsaStateSelect = ({ onChange, onFocus }) => (
  <Select
    getOptionLabel={usaState => usaState.name}
    getOptionValue={usaState => usaState.abbreviation}
    id="select-state-dropdown"
    instanceId="select-state-"
    onChange={onChange}
    onFocus={onFocus}
    options={usaStateOptions}
  />
);

UsaStateSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

UsaStateSelect.defaultProps = {
  onFocus: () => {},
};

export default UsaStateSelect;

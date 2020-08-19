import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { UsaStates } from 'usa-states';

const options = new UsaStates().states.map(item => {
  return {
    label: item.name,
    value: `US-${item.abbreviation}`,
  };
});

const UsaStateSelect = ({ isClearable, onChange, onFocus }) => (
  <Select
    id="select-state-dropdown"
    instanceId="select-state-"
    isClearable={isClearable}
    onChange={onChange}
    onFocus={onFocus}
    options={options}
    placeholder="Select state"
  />
);

UsaStateSelect.propTypes = {
  isClearable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

UsaStateSelect.defaultProps = {
  isClearable: false,
  onFocus: () => {},
};

export default UsaStateSelect;

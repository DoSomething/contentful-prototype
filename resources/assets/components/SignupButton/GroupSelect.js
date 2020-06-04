import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';

const options = [
  { value: 1, label: 'New York' },
  { value: 2, label: 'Philadelphia' },
  { value: 3, label: 'San Francisco' },
];

const GroupSelect = ({ onChange }) => (
  <Card title="Join a group" className="rounded bordered">
    <div className="p-3">
      <Select onChange={onChange} options={options} />
    </div>
  </Card>
);

GroupSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default GroupSelect;

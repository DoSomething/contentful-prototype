import React from 'react';
import PropTypes from 'prop-types';

const FormItem = props => (
  <div className="mt-4">
    <h5 className="text-gray-700">{props.title}</h5>
    <p>{props.value}</p>
  </div>
);

export default FormItem;

FormItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
};

FormItem.defaultProps = {
  value: '-',
};

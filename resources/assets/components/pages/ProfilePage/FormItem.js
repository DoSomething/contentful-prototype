import React from 'react';
import PropTypes from 'prop-types';

const FormItem = props => (
  <div className="margin-top-lg">
    <h5>{props.title}</h5>
    <div className="margin-top-md">
      <p>{props.value}</p>
    </div>
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

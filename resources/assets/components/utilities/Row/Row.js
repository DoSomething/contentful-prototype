import React from 'react';
import PropTypes from 'prop-types';

import './row.scss';

const Row = ({ children }) => {
  // Ensure we have an array, even if a single child was passed through.
  const childArray = React.Children.toArray(children);

  return (
    <div className="row">
      <div className="primary">{childArray[0]}</div>

      <div className="secondary">{childArray[1]}</div>
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Row;

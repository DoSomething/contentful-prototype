import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from '../ErrorBlock/ErrorBlock';

const Placeholder = ({ error }) => {
  if (error) {
    return <ErrorBlock />;
  }

  return (
    <div className="placeholder">
      <div className="spinner" />
    </div>
  );
};

Placeholder.propTypes = {
  error: PropTypes.bool,
};

Placeholder.defaultProps = {
  error: false,
};

export default Placeholder;

import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../artifacts/Spinner/Spinner';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';

const Placeholder = ({ error }) => {
  if (error) {
    return <ErrorBlock />;
  }

  return (
    <div className="placeholder">
      <Spinner />
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

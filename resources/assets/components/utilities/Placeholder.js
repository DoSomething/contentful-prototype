import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../artifacts/Spinner/Spinner';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';

const Placeholder = ({ error }) => {
  if (error) {
    return <ErrorBlock />;
  }

  return (
    <div className="placeholder h-56 w-full" style={{ minHeight: '70vh' }}>
      <Spinner className="flex h-full items-center justify-center" />
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

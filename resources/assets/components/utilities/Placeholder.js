import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../artifacts/Spinner/Spinner';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';

const Placeholder = ({ error, needsMinHeight }) => {
  if (error) {
    return <ErrorBlock />;
  }

  return (
    <div
      className="placeholder h-56 w-full"
      style={needsMinHeight ? { minHeight: '70vh' } : null}
    >
      <Spinner className="flex h-full items-center justify-center" />
    </div>
  );
};

Placeholder.propTypes = {
  error: PropTypes.bool,
  needsMinHeight: PropTypes.bool,
};

Placeholder.defaultProps = {
  error: false,
  needsMinHeight: true,
};

export default Placeholder;

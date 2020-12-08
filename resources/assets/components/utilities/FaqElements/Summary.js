import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Summary = ({ className, text }) => (
  <summary
    className={classnames(className, 'font-bold text-base cursor-pointer')}
  >
    {text}
  </summary>
);

Summary.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Summary.defaultProps = {
  className: null,
};

export default Summary;

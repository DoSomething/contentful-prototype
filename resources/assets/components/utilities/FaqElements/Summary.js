import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Summary = ({ className, summaryText }) => (
  <summary
    className={classnames(className, 'font-bold text-base cursor-pointer')}
  >
    {summaryText}
  </summary>
);

Summary.propTypes = {
  className: PropTypes.string,
  summaryText: PropTypes.string.isRequired,
};

Summary.defaultProps = {
  className: null,
};

export default Summary;

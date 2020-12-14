import React from 'react';
import PropTypes, { object } from 'prop-types';
import classnames from 'classnames';

const Details = ({ children, className }) => (
  <details className={classnames(className, 'pb-4')}>{children}</details>
);

Details.propTypes = {
  children: PropTypes.arrayOf(object).isRequired,
  className: PropTypes.string,
};

Details.defaultProps = {
  className: null,
};

export default Details;

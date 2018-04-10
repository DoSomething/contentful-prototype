import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Enclosure = ({ children, className = '' }) => (
  <div className={classnames(className)}>{children}</div>
);

Enclosure.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Enclosure.defaultProps = {
  className: '',
};

export default Enclosure;

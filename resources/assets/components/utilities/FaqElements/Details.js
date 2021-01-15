import React from 'react';
import PropTypes, { object } from 'prop-types';
import classnames from 'classnames';

const Details = ({ attributes, children, className }) => (
  <details {...attributes} className={classnames(className, 'pb-4')}>
    {children}
  </details>
);

Details.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.arrayOf(object).isRequired,
  className: PropTypes.string,
};

Details.defaultProps = {
  attributes: null,
  className: null,
};

export default Details;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DetailsParagraph = ({ children, className }) => (
  <p className={classnames(className, 'pt-2')}>{children}</p>
);

DetailsParagraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
};

DetailsParagraph.defaultProps = {
  className: null,
};

export default DetailsParagraph;

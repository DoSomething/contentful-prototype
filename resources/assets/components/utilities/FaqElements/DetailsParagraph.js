import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DetailsParagraph = ({ children, className, detailsText }) => (
  <p className={classnames(className, 'pt-2')}>{children || detailsText}</p>
);

DetailsParagraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),
  className: PropTypes.string,
  detailsText: PropTypes.string.isRequired,
};

DetailsParagraph.defaultProps = {
  children: null,
  className: null,
};

export default DetailsParagraph;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Basic button link (<a>) with minimal styles.
 * Pass classes to style pseudo states like :hover, :focus and :active, etc.
 *
 * @param {Object} props
 */
const ButtonLink = ({ className, href, onClick, text }) => (
  <a href={href} className={classnames('btn', className)} onClick={onClick}>
    {text}
  </a>
);

ButtonLink.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

ButtonLink.defaultProps = {
  className: null,
  onClick: null,
};

export default ButtonLink;

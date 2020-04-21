import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Basic button link (<a>) with minimal styles.
 * Pass classes to style pseudo states like :hover, :focus and :active, etc.
 *
 * @param {Object} props
 */
const LinkButton = ({ className, data, href, onClick, text }) => (
  <a
    className={classnames('btn', className)}
    href={href}
    onClick={onClick}
    {...data}
  >
    {text}
  </a>
);

LinkButton.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

LinkButton.defaultProps = {
  className: null,
  data: {},
  onClick: null,
};

export default LinkButton;

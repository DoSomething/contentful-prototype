import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Basic button link (<a>) with minimal styles.
 * Pass classes to style pseudo states like :hover, :focus and :active, etc.
 *
 * @param {Object} props
 */
const LinkButton = ({ attributes, className, href, onClick, text }) => (
  <a
    className={classnames('btn', className)}
    href={href}
    onClick={onClick}
    {...attributes}
  >
    {text}
  </a>
);

LinkButton.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

LinkButton.defaultProps = {
  attributes: {},
  className: null,
  onClick: null,
};

export default LinkButton;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { isExternal } from '../../../helpers/url';

/**
 * Basic button link (<a>) with minimal styles.
 * Pass classes to style pseudo states like :hover, :focus and :active, etc.
 *
 * @param {Object} props
 */
const LinkButton = ({ attributes, className, href, onClick, text }) => {
  const linkAttributes = {
    rel: isExternal(href) ? 'noopener noreferrer' : null,
    target: isExternal(href) ? '_blank' : null,
  };

  return (
    <a
      className={classnames('btn', className)}
      href={href}
      onClick={onClick}
      {...linkAttributes}
      {...attributes}
    >
      {text}
    </a>
  );
};

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

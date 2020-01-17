import React from 'react';
import PropTypes from 'prop-types';
// @TODO: Move to Helper Components?

const Header = ({ content, textColor }) => (
  <div className={`font-bold uppercase ${textColor}`}>{content}</div>
);

Header.propTypes = {
  content: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

Header.defaultProps = {
  textColor: 'text-gray-600',
};

export default Header;

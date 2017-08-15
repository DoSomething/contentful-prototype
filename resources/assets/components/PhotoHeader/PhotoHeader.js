import React from 'react';
import PropTypes from 'prop-types';
import './photo-header.scss';

const PhotoHeader = ({ children, backgroundImage }) => (
  <div className="photo-header" style={{ backgroundImage: `url(${backgroundImage})` }}>
    { children }
  </div>
);

PhotoHeader.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string,
};

PhotoHeader.defaultProps = {
  backgroundImage: '',
};

export default PhotoHeader;

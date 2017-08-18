import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './photo-header.scss';

const photoHeaderClasses = 'photo-header background-image-centered padding-lg';

const PhotoHeader = ({ children, className, backgroundImage }) => (
  <div
    className={classnames(photoHeaderClasses, className)}
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    { children }
  </div>
);

PhotoHeader.propTypes = {
  backgroundImage: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PhotoHeader.defaultProps = {
  backgroundImage: '',
  className: '',
};

export default PhotoHeader;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './photo-header.scss';

const photoHeaderClasses = 'photo-header padding-lg';

const renderBackgroundImage = backgroundImage => (
  backgroundImage ?
    <div
      className="photo-header__background-image background-image-centered"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    :
    null
);

const PhotoHeader = ({ children, className, backgroundImage }) => (
  <div
    className={classnames(photoHeaderClasses, className)}
  >
    { renderBackgroundImage(backgroundImage) }
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

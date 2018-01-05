import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './photo-header.scss';

const renderBackgroundImage = backgroundImage => (
  backgroundImage ?
    <div
      className="photo-header__background-image background-image-centered"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    :
    null
);

const PhotoHeader = ({ children, className, backgroundImage, themeColor }) => (
  <div
    className={classnames('photo-header padding-lg', className, themeColor)}
  >
    { renderBackgroundImage(backgroundImage) }
    { children }
  </div>
);

PhotoHeader.propTypes = {
  backgroundImage: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  themeColor: PropTypes.string,
};

PhotoHeader.defaultProps = {
  backgroundImage: '',
  className: '',
  themeColor: null,
};

export default PhotoHeader;

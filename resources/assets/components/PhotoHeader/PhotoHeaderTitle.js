import React from 'react';
import PropTypes from 'prop-types';
import './photo-header-title.scss';

const PhotoHeaderTitle = ({ primary, secondary }) => (
  <div className="photo-header__title">
    <span className="__secondary">{secondary}</span>
    <h1 className="__primary">{primary}</h1>
  </div>
);

PhotoHeaderTitle.defaultProps = {
  primary: null,
  secondary: null,
};

PhotoHeaderTitle.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
};

export default PhotoHeaderTitle;

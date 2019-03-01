import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderGalleryItem = (child, index) => (
  <li key={`submission-${index}`}>{child}</li>
);

const Gallery = ({ type, children, className = null }) =>
  children.length ? (
    <ul
      className={classnames('gallery-grid', `gallery-grid-${type}`, className)}
    >
      {children.map(renderGalleryItem)}
    </ul>
  ) : null;

Gallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  type: PropTypes.oneOf(['duo', 'triad', 'quartet']),
};

Gallery.defaultProps = {
  children: [],
  className: null,
  type: null,
};

export default Gallery;

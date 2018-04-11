import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { modifiers } from '../../../helpers';

const renderGalleryItem = (child, index) => (
  <li key={`submission-${index}`}>{child}</li>
);

const Gallery = ({ type, children, className = null }) =>
  children.length ? (
    <ul className={classnames('gallery', className, modifiers(type))}>
      {children.map(renderGalleryItem)}
    </ul>
  ) : null;

Gallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  type: PropTypes.oneOf(['triad', 'quartet']),
};

Gallery.defaultProps = {
  children: [],
  className: null,
  type: null,
};

export default Gallery;

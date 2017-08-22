import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { modifiers } from '../../helpers';

const renderGalleryItem = (child, index) => <li key={`submission-${index}`}>{child}</li>;

const Gallery = ({ type, children }) => (
  children.length ? <ul className={classnames('gallery', modifiers(type))}>{children.map(renderGalleryItem)}</ul> : null
);

Gallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  type: PropTypes.oneOf(['triad', 'quartet']),
};

Gallery.defaultProps = {
  children: [],
  type: null,
};

export default Gallery;

import React from 'react';
import classnames from 'classnames';
import { modifiers } from '../../helpers';

const renderGalleryItem = (child, index) => {
  return <li key={`submission-${index}`} className="">{child}</li>;
};

const Gallery = ({isFetching, type = null, children}) => {
  if (isFetching) {
    return <div>loading…</div>;
  }
  else {
    return children.length ? <ul className={classnames('gallery', modifiers(type))}>{children.map(renderGalleryItem)}</ul> : null;
  }
}

Gallery.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  type: React.PropTypes.oneOf(['triad', 'quartet']),
};

export default Gallery;


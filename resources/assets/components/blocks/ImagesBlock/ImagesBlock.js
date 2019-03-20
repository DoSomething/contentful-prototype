import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Gallery from '../../utilities/Gallery/Gallery';

const ImagesBlock = ({ className, images }) => (
  <Gallery
    type="triad"
    className={classnames('expand-horizontal-md', className)}
  >
    {images.map(image => (
      <img alt={image.description} src={image.url} key={image.url} />
    ))}
  </Gallery>
);

ImagesBlock.propTypes = {
  className: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
    }),
  ),
};

ImagesBlock.defaultProps = {
  className: null,
  images: [],
};

export default ImagesBlock;

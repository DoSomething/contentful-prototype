import React from 'react';
import PropTypes from 'prop-types';

import Gallery from '../../utilities/Gallery/Gallery';

const ImagesBlock = ({ images }) => (
  <Gallery type="triad" className="expand-horizontal-md">
    {images.map(image => <img alt="Images Block" src={image} key={image} />)}
  </Gallery>
);

ImagesBlock.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImagesBlock;

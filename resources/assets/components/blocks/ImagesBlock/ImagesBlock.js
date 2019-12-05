import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Gallery from '../../utilities/Gallery/Gallery';

export const ImagesBlockFragment = gql`
  fragment ImagesBlockFragment on ImagesBlock {
    images {
      description
      url(w: 500, h: 500, fit: FILL)
    }
  }
`;

const ImagesBlock = ({ className, images }) => (
  <Gallery type="triad" className={classnames('-mx-3', className)}>
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

import React from 'react';
import PropTypes from 'prop-types';

import Person from '../../Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';

const renderBlock = block => {
  switch (block.type) {
    case 'person':
      return <Person key={block.id} {...block.fields} />;

    case 'campaign':
      return null;

    default:
      return null;
  }
};

const galleryTypes = ['duo', 'triad', 'quartet'];

const GalleryBlock = ({ title, blocks, itemsPerRow }) => {
  // Subtract 2 from itemsPerRow to map properly to the galleryTypes indices (see propTypes).
  const galleryType = galleryTypes[itemsPerRow - 2];

  return (
    <div className="gallery-block">
      {title ? <h1 className="padding-horizontal-md">{title}</h1> : null}

      <Gallery type={galleryType}>{blocks.map(renderBlock)}</Gallery>
    </div>
  );
};

GalleryBlock.propTypes = {
  title: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerRow: PropTypes.oneOf([2, 3, 4]).isRequired,
};

GalleryBlock.defaultProps = {
  title: null,
};

export default GalleryBlock;

import React from 'react';
import PropTypes from 'prop-types';

import Person from '../../Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';
import PageGalleryItem from '../../utilities/PageGalleryItem';

const renderBlock = block => {
  switch (block.type) {
    case 'person':
      return <Person key={block.id} {...block.fields} />;

    case 'campaign':
      return null;

    case 'page':
      return <PageGalleryItem key={block.id} {...block.fields} />;

    default:
      return null;
  }
};

const galleryTypes = { '2': 'duo', '3': 'triad', '4': 'quartet' };

const GalleryBlock = ({ title, blocks, itemsPerRow }) => {
  const galleryType = galleryTypes[itemsPerRow];

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

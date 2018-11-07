import React from 'react';
import PropTypes from 'prop-types';

import Person from '../../Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';
import PageGalleryItem from '../../utilities/Gallery/templates/PageGalleryItem/PageGalleryItem';
import ContentBlockGalleryItem from '../../utilities/Gallery/templates/ContentBlockGalleryItem';
import CampaignGalleryItem from '../../utilities/Gallery/templates/CampaignGalleryItem/CampaignGalleryItem';

const renderBlock = (block, imageAlignment, imageFit) => {
  switch (block.type) {
    case 'person':
      return <Person key={block.id} {...block.fields} />;

    case 'campaign':
      return <CampaignGalleryItem key={block.id} {...block} />;

    case 'page':
      return <PageGalleryItem key={block.id} {...block.fields} />;

    case 'contentBlock':
      return (
        <ContentBlockGalleryItem
          key={block.id}
          {...block.fields}
          imageAlignment={imageAlignment}
          imageFit={imageFit}
        />
      );

    default:
      return null;
  }
};

const galleryTypes = { '2': 'duo', '3': 'triad', '4': 'quartet' };

const GalleryBlock = ({
  title,
  blocks,
  imageAlignment,
  itemsPerRow,
  imageFit,
}) => {
  const galleryType = galleryTypes[itemsPerRow];

  return (
    <div className="gallery-block">
      {title ? <h1 className="padding-horizontal-md">{title}</h1> : null}

      <Gallery type={galleryType}>
        {blocks.map(block => renderBlock(block, imageAlignment, imageFit))}
      </Gallery>
    </div>
  );
};

GalleryBlock.propTypes = {
  title: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  imageAlignment: PropTypes.oneOf(['top', 'left']).isRequired,
  itemsPerRow: PropTypes.oneOf([2, 3, 4]).isRequired,
  imageFit: PropTypes.oneOf(['fill', 'pad']).isRequired,
};

GalleryBlock.defaultProps = {
  title: null,
};

export default GalleryBlock;

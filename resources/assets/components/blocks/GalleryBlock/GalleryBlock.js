import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

const GalleryBlock = props => {
  const {
    title,
    blocks,
    className,
    itemsPerRow,
    imageAlignment,
    imageFit,
  } = props;

  const galleryType = galleryTypes[itemsPerRow];

  return (
    <div className={classnames('gallery-block', className)}>
      {title ? <h1>{title}</h1> : null}

      <Gallery type={galleryType} className="expand-horizontal-md">
        {blocks.map(block => renderBlock(block, imageAlignment, imageFit))}
      </Gallery>
    </div>
  );
};

GalleryBlock.propTypes = {
  className: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  imageAlignment: PropTypes.oneOf(['top', 'left']).isRequired,
  imageFit: PropTypes.oneOf(['fill', 'pad']).isRequired,
  itemsPerRow: PropTypes.oneOf([2, 3, 4]).isRequired,
  title: PropTypes.string,
};

GalleryBlock.defaultProps = {
  className: null,
  title: null,
};

export default GalleryBlock;

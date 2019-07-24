import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Person from '../../Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';
import PageGalleryItem from '../../utilities/Gallery/templates/PageGalleryItem/PageGalleryItem';
import ContentBlockGalleryItem from '../../utilities/Gallery/templates/ContentBlockGalleryItem';
import CampaignGalleryItem from '../../utilities/Gallery/templates/CampaignGalleryItem/CampaignGalleryItem';

export const GalleryBlockFragment = gql`
  fragment GalleryBlockFragment on GalleryBlock {
    id
    internalTitle
    title
    itemsPerRow
    imageAlignment
    imageFit
    blocks {
      id
      ...PersonBlockFragment
    }
  }
`;

const renderBlock = (block, imageAlignment, imageFit) => {
  switch (block.type) {
    case 'person':
      return <Person key={block.id} {...block.fields} />;
    case 'staff':
      return <Person key={block.id} {...block} />;

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
  const { title, blocks, itemsPerRow, imageAlignment, imageFit } = props;
  const galleryType = galleryTypes[itemsPerRow];
  return (
    <div className="gallery-block">
      {title ? <h1>{title}</h1> : null}

      <Gallery type={galleryType} className="expand-horizontal-md">
        {blocks.map(block => renderBlock(block, imageAlignment, imageFit))}
      </Gallery>
    </div>
  );
};

GalleryBlock.propTypes = {
  title: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerRow: PropTypes.oneOf([2, 3, 4]).isRequired,
  imageAlignment: PropTypes.oneOf(['top', 'left']).isRequired,
  imageFit: PropTypes.oneOf(['fill', 'pad']).isRequired,
};

GalleryBlock.defaultProps = {
  title: null,
};

export default GalleryBlock;

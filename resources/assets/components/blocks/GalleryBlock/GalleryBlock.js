import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Person from '../../Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';
import PageGalleryItem from '../../utilities/Gallery/templates/PageGalleryItem/PageGalleryItem';
import ContentBlockGalleryItem from '../../utilities/Gallery/templates/ContentBlockGalleryItem';
import CampaignGalleryItem from '../../utilities/Gallery/templates/CampaignGalleryItem/CampaignGalleryItem';

// HACK: Many of the default attributes for components are asked manually.
export const GalleryBlockFragment = gql`
  fragment GalleryBlockFragment on GalleryBlock {
    id
    internalTitle
    title
    ipr: itemsPerRow
    imageAlignment
    imageFit
    blocks {
      ... on Page {
        slug
      }
      ... on Showcasable {
        id
        showcaseTitle
        showcaseDescription
        showcaseImage {
          url
        }

        ... on PersonBlock {
          type
        }
        ... on ContentBlock {
          imageAlignment
        }
      }
    }
  }
`;

const renderBlock = (block, imageAlignment, imageFit) => {
  const isGraphql = block.__typename;
  const type = block.__typename || block.type;
  const fields =
    isGraphql || type === 'campaign' ? { ...block } : { ...block.fields };
  // HACK:  Major hacks here
  // TODO: Ask if is campaign page or campaignwebsite or is it campaign (so many campaign-esque)
  switch (type) {
    case 'person':
    case 'PersonBlock':
      return <Person key={block.id} {...fields} />;

    case 'campaign':
    case 'CampaignPage':
      fields.title = block.showcaseTitle || block.title;
      fields.tagline = block.showcaseDescription || block.tagline;
      fields.coverImage = block.showcaseImage || block.converImage;
      return <CampaignGalleryItem key={block.id} {...fields} />;

    case 'page':
    case 'Page':
      fields.title = block.showcaseTitle || block.title;
      fields.subTitle = block.showcaseDescription || block.subTitle;
      fields.coverImage = block.showcaseImage || block.coverImage.url;
      return <PageGalleryItem key={block.id} {...fields} />;

    case 'contentBlock':
    case 'ContentBlock':
      fields.title = block.showcaseTitle || block.title;
      fields.image = block.showcaseImage || block.image;
      fields.content = block.showcaseDescription || block.content;
      debugger;
      return (
        <ContentBlockGalleryItem
          key={block.id}
          {...fields}
          imageAlignment={imageAlignment}
          imageFit={imageFit}
        />
      );

    default:
      return null;
  }
};

const galleryTypes = {
  '2': 'duo',
  '3': 'triad',
  '4': 'quartet',
  '5': 'quintet',
};

const GalleryBlock = props => {
  const { title, blocks, ipr, imageAlignment, imageFit } = props;
  const galleryType = galleryTypes[ipr];
  return (
    <div className="gallery-block">
      {title ? <h1> {title} </h1> : null}
      <Gallery type={galleryType} className="expand-horizontal-md">
        {blocks.map(block => renderBlock(block, imageAlignment, imageFit))}
      </Gallery>
    </div>
  );
};

GalleryBlock.propTypes = {
  title: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  ipr: PropTypes.oneOf([2, 3, 4, 5]).isRequired,
  imageAlignment: PropTypes.oneOf(['top', 'left']).isRequired,
  imageFit: PropTypes.oneOf(['fill', 'pad']).isRequired,
};

GalleryBlock.defaultProps = {
  title: null,
};

export default GalleryBlock;

import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import Person from '../../utilities/Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';
import PageGalleryItem from '../../utilities/Gallery/templates/PageGalleryItem/PageGalleryItem';
import ContentBlockGalleryItem from '../../utilities/Gallery/templates/ContentBlockGalleryItem';
import CampaignGalleryItem from '../../utilities/Gallery/templates/CampaignGalleryItem/CampaignGalleryItem';

export const GalleryBlockFragment = gql`
  fragment GalleryBlockFragment on GalleryBlock {
    title
    imageAlignment
    imageFit
    itemsPerRow
    blocks {
      id
      ... on Showcasable {
        showcaseTitle
        showcaseDescription
        showcaseImage {
          url
          description
        }
      }
      ... on PersonBlock {
        type
        twitterId
      }
      ... on CampaignWebsite {
        slug
      }
      ... on Page {
        slug
      }
    }
  }
`;

const renderBlock = (block, imageAlignment, imageFit) => {
  // We finesse the block type and fields to support both
  // GraphQL ('Showcasable' interface) and Phoenix-backend (legacy) queried blocks.
  const blockType = block.__typename || block.type;
  const fields =
    block.__typename || block.type === 'campaign'
      ? withoutNulls(block)
      : withoutNulls(block.fields);

  switch (blockType) {
    case 'person':
    case 'PersonBlock':
      return <Person key={block.id} {...fields} />;

    case 'campaign':
    case 'CampaignWebsite':
      return (
        <CampaignGalleryItem
          key={block.id}
          showcaseTitle={fields.title}
          showcaseDescription={fields.tagline}
          showcaseImage={fields.coverImage}
          {...fields}
        />
      );

    case 'page':
    case 'Page':
      return (
        <PageGalleryItem
          key={block.id}
          showcaseTitle={fields.title}
          showcaseDescription={fields.subTitle}
          showcaseImage={fields.coverImage}
          {...fields}
        />
      );

    case 'contentBlock':
    case 'ContentBlock':
      return (
        <ContentBlockGalleryItem
          key={block.id}
          showcaseTitle={fields.title}
          showcaseDescription={fields.content}
          showcaseImage={fields.image}
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
  const { title, blocks, itemsPerRow, imageAlignment, imageFit } = props;

  const galleryType = galleryTypes[itemsPerRow];

  return (
    <div className="gallery-block">
      {title ? <SectionHeader underlined title={title} /> : null}
      <Gallery type={galleryType} className="-mx-3 mt-3">
        {blocks.map(block =>
          renderBlock(
            block,
            imageAlignment.toLowerCase(),
            imageFit.toLowerCase(),
          ),
        )}
      </Gallery>
    </div>
  );
};

GalleryBlock.propTypes = {
  title: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerRow: PropTypes.oneOf([2, 3, 4, 5]).isRequired,
  imageAlignment: PropTypes.oneOf(['TOP', 'LEFT']).isRequired,
  imageFit: PropTypes.oneOf(['FILL', 'PAD']),
};

GalleryBlock.defaultProps = {
  title: null,
  imageFit: 'FILL',
};

export default GalleryBlock;

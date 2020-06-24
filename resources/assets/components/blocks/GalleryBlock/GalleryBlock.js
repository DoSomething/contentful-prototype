import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import Person from '../../utilities/Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';
import ScholarshipCard from '../../utilities/ScholarshipCard/ScholarshipCard';
import PageGalleryItem from '../../utilities/Gallery/templates/PageGalleryItem/PageGalleryItem';
import ContentBlockGalleryItem from '../../utilities/Gallery/templates/ContentBlockGalleryItem';
import CampaignGalleryItem from '../../utilities/Gallery/templates/CampaignGalleryItem/CampaignGalleryItem';

export const GalleryBlockFragment = gql`
  fragment GalleryBlockFragment on GalleryBlock {
    title
    galleryType
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
        scholarshipAmount
        scholarshipDeadline
        campaignId
        slug
        path
      }
      ... on StoryPageWebsite {
        path
      }
      ... on Page {
        slug
      }
    }
  }
`;

const renderBlock = (blockType, block, imageAlignment, imageFit) => {
  // GraphQL ('Showcasable' interface) and Phoenix-backend (legacy) queried blocks.
  const fields = withoutNulls(block);

  switch (blockType) {
    case 'PERSON':
    case 'PersonBlock':
      return <Person key={block.id} {...fields} />;

    case 'CAMPAIGN':
    case 'CampaignWebsite':
      // @TODO: Replace with Campaign Card
      return (
        <CampaignGalleryItem
          key={block.id}
          showcaseTitle={fields.title}
          showcaseDescription={fields.tagline}
          showcaseImage={fields.coverImage}
          {...withoutNulls(fields)}
        />
      );

    case 'SCHOLARSHIP':
      return <ScholarshipCard key={block.id} campaign={block} />;

    case 'PAGE':
    case 'Page':
      // @TODO: Replace with Page Card
      return (
        <PageGalleryItem
          key={block.id}
          showcaseTitle={fields.title}
          showcaseDescription={fields.subTitle}
          showcaseImage={fields.coverImage}
          {...fields}
        />
      );

    case 'EXTERNAL_LINK':
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

const galleryLayouts = {
  '2': 'duo',
  '3': 'triad',
  '4': 'quartet',
  '5': 'quintet',
};

const GalleryBlock = props => {
  const {
    title,
    galleryType,
    blocks,
    itemsPerRow,
    imageAlignment,
    imageFit,
  } = props;

  const galleryLayout = galleryLayouts[itemsPerRow];

  return (
    <div className="gallery-block">
      {title ? <SectionHeader underlined title={title} /> : null}

      <Gallery type={galleryLayout} className="-mx-3 mt-3">
        {blocks.map(block =>
          renderBlock(
            // @TODO: Remove the block.__typename hack after we are able to
            // properly source blockType from the entry
            galleryType || block.__typename,
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
  galleryType: PropTypes.oneOf([
    'PERSON',
    'CAMPAIGN',
    'SCHOLARSHIP',
    'PAGE',
    'EXTERNAL_LINK',
  ]),
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerRow: PropTypes.oneOf([2, 3, 4, 5]).isRequired,
  imageAlignment: PropTypes.oneOf(['TOP', 'LEFT']).isRequired,
  imageFit: PropTypes.oneOf(['FILL', 'PAD']),
};

GalleryBlock.defaultProps = {
  title: null,
  imageFit: 'FILL',
  galleryType: null,
};

export default GalleryBlock;

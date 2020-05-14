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
import ScholarshipCard, {
  scholarshipCardFragment,
} from '../../utilities/ScholarshipCard/ScholarshipCard';

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
        scholarshipAmount
        scholarshipDeadline
        slug
      }
      ... on Page {
        slug
      }
    }
  }
`;

const renderBlock = (blockType, block, imageAlignment, imageFit) => {
  // blockType is used to determine what kind of gallery this is going to be
  // Person, Campaign, Page, Scholarship, Content Block (External)

  // GraphQL ('Showcasable' interface) and Phoenix-backend (legacy) queried blocks.
  const fields = withoutNulls(block);

  switch (blockType) {
    case 'person':
      return <Person key={block.id} {...fields} />;

    case 'campaign':
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

    case 'scholarship':
      return <ScholarshipCard key={block.id} campaign={block} />;

    case 'page':
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

    case 'contentBlock':
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
  const {
    title,
    blockType,
    blocks,
    itemsPerRow,
    imageAlignment,
    imageFit,
  } = props;

  const galleryType = galleryTypes[itemsPerRow];

  return (
    <div className="gallery-block">
      {title ? <SectionHeader underlined title={title} /> : null}

      {/* Should it read the gallery type and render just those blocks?? */}
      <Gallery type={galleryType} className="-mx-3 mt-3">
        {blocks.map(block =>
          renderBlock(
            blockType,
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
  blockType: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerRow: PropTypes.oneOf([2, 3, 4, 5]).isRequired,
  imageAlignment: PropTypes.oneOf(['TOP', 'LEFT']).isRequired,
  imageFit: PropTypes.oneOf(['FILL', 'PAD']),
};

GalleryBlock.defaultProps = {
  title: null,
  imageFit: 'FILL',
  blockType: 'scholarship',
};

export default GalleryBlock;

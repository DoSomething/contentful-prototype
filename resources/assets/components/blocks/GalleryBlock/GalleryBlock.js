import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import Person from '../../utilities/Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';
import CampaignCard, {
  campaignCardFragment,
} from '../../utilities/CampaignCard/CampaignCard';
import ScholarshipCard, {
  scholarshipCardFragment,
} from '../../utilities/ScholarshipCard/ScholarshipCard';
import PageCard, { pageCardFragment } from '../../utilities/PageCard/PageCard';
import ContentBlockGalleryItem from '../../utilities/Gallery/templates/ContentBlockGalleryItem';

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
      ...CampaignCard
      ...ScholarshipCard
      ...PageCard
    }
  }

  ${campaignCardFragment}
  ${scholarshipCardFragment}
  ${pageCardFragment}
`;

const renderBlock = (blockType, block, imageAlignment, imageFit) => {
  const fields = withoutNulls(block);

  switch (blockType) {
    case 'PERSON':
    case 'PersonBlock':
      return <Person key={block.id} {...fields} />;

    case 'CAMPAIGN':
    case 'CampaignWebsite':
      return <CampaignCard key={block.id} campaign={fields} />;

    case 'SCHOLARSHIP':
      return <ScholarshipCard key={block.id} campaign={fields} />;

    case 'PAGE':
    case 'Page':
      return <PageCard key={block.id} page={fields} />;

    case 'CONTENT_BLOCK':
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
    'CONTENT_BLOCK',
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

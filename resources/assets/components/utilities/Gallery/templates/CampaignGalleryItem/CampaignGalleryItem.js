import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure/Figure';
import { contentfulImageUrl } from '../../../../../helpers';

const CampaignGalleryItem = ({
  showcaseTitle,
  showcaseDescription,
  showcaseImage,
  slug,
}) => (
  <a className="campaign-gallery-item block" href={`/us/campaigns/${slug}`}>
    <Figure
      alt={`${showcaseImage.description || showcaseTitle}-photo`}
      image={contentfulImageUrl(showcaseImage.url, '400', '400', 'fill')}
    >
      <h4>{showcaseTitle}</h4>
      {showcaseDescription ? (
        <p className="font-normal">{showcaseDescription}</p>
      ) : null}
    </Figure>
  </a>
);

CampaignGalleryItem.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  slug: PropTypes.string.isRequired,
};

export default CampaignGalleryItem;

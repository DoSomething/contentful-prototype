import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../Card/Card';
import { Figure } from '../../../Figure/Figure';
import { contentfulImageUrl } from '../../../../../helpers';

const CampaignGalleryItem = ({
  showcaseTitle,
  showcaseDescription,
  showcaseImage,
  slug,
}) => (
  <Card className="rounded">
    <a className="campaign-gallery-item block" href={`/us/campaigns/${slug}`}>
      <Figure
        alt={`${showcaseImage.description || showcaseTitle}-photo`}
        image={contentfulImageUrl(showcaseImage.url, '800', '450', 'fill')}
      >
        <div className="m-3">
          <h4 className="text-blue-500">{showcaseTitle}</h4>
          {showcaseDescription ? (
            <p className="font-normal">{showcaseDescription}</p>
          ) : null}
        </div>
      </Figure>
    </a>
  </Card>
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

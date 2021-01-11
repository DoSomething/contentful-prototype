import React from 'react';
import PropTypes from 'prop-types';

import LazyImage from '../../../utilities/LazyImage';
import { contentfulImageUrl } from '../../../../helpers/contentful';
import { getFormattedScreenSize } from '../../../../helpers/display';

const CampaignPreview = ({ campaignWebsite }) => {
  const {
    path,
    showcaseTitle,
    showcaseDescription,
    showcaseImage,
  } = campaignWebsite;

  // @TODO: Can we use srcset instead of this logic?
  const showcaseImageUrl =
    getFormattedScreenSize() === 'small'
      ? contentfulImageUrl(showcaseImage.url, 200, 100, 'fill')
      : contentfulImageUrl(showcaseImage.url, 640, 360, 'fill');

  return (
    <a className="flex" href={path}>
      <LazyImage
        className="h-16 sm:h-auto xl:h-16 md:hidden xl:block"
        src={showcaseImageUrl}
        alt={showcaseImage.description || 'Campaign showcase image'}
      />
      <div className="pl-3 md:p-0 xl:pl-3">
        <h3 className="font-bold text-base text-blue-500">{showcaseTitle}</h3>

        <p className="font-normal mt-1 text-gray-500 text-sm">
          {showcaseDescription}
        </p>
      </div>
    </a>
  );
};

CampaignPreview.propTypes = {
  campaignWebsite: PropTypes.shape({
    path: PropTypes.string.isRequired,
    showcaseTitle: PropTypes.string.isRequired,
    showcaseDescription: PropTypes.string.isRequired,
    showcaseImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default CampaignPreview;

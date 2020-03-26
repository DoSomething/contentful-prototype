import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import LazyImage from '../../../utilities/LazyImage';
import {
  contentfulImageUrl,
  getFormattedScreenSize,
} from '../../../../helpers';

const CampaignPreview = ({ campaignWebsite }) => {
  const { showcaseTitle, showcaseDescription, showcaseImage } = campaignWebsite;

  const showcaseImageUrl =
    getFormattedScreenSize() === 'small'
      ? contentfulImageUrl(showcaseImage.url, 200, 100, 'fill')
      : contentfulImageUrl(showcaseImage.url, 640, 360, 'fill');

  return (
    <div className="max-w-md flex">
      <LazyImage
        className="h-16 md:hidden xl:block"
        css={css`
          min-width: 33%;
        `}
        src={showcaseImageUrl}
        alt={showcaseImage.description || 'Campaign showcase image'}
      />
      <div className="pl-3 md:p-0 xl:pl-3">
        <h3 className="font-bold text-base text-blue-500">{showcaseTitle}</h3>
        <p className="mt-1 text-gray-500 text-sm">{showcaseDescription}</p>
      </div>
    </div>
  );
};

CampaignPreview.propTypes = {
  campaignWebsite: PropTypes.shape({
    showcaseTitle: PropTypes.string.isRequired,
    showcaseDescription: PropTypes.string.isRequired,
    showcaseImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default CampaignPreview;

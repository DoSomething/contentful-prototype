import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../../Enclosure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../../LedeBanner/LedeBannerContainer';

const MarqueeTemplate = ({
  campaignId,
  campaignTitle,
  coverImage,
  tagline,
}) => {
  console.log('🖼', { campaignId, campaignTitle, coverImage, tagline });

  // @TODO: try using srcset
  const coverImageSrc = contentfulImageUrl(
    coverImage.url,
    '1440',
    '810',
    'fill',
  );

  return (
    <React.Fragment>
      <img className="cover-image" src={coverImageSrc} />
      <div className="clearfix bg-white">
        <Enclosure className="default-container margin-lg">
          <header role="banner">
            <h1>{campaignTitle}</h1>
          </header>
        </Enclosure>
      </div>
    </React.Fragment>
  );
};

export default MarqueeTemplate;

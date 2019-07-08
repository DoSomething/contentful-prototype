import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../../Enclosure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../../LedeBanner/LedeBannerContainer';

const MarqueeTemplate = ({
  campaignId,
  content,
  coverImage,
  subtitle,
  tagline,
  title,
}) => {
  const coverImageUrls = {
    extraLarge: contentfulImageUrl(coverImage.url, '2880', '1620', 'fill'),
    large: contentfulImageUrl(coverImage.url, '1440', '810', 'fill'),
    medium: contentfulImageUrl(coverImage.url, '720', '405', 'fill'),
    small: contentfulImageUrl(coverImage.url, '360', '202', 'fill'),
  };

  console.log('🖼', { campaignId, title, coverImage, coverImageUrls, tagline });

  return (
    <React.Fragment>
      <article className="marquee-landing-page">
        <div className="base-16-grid bg-white">
          <img
            className="cover-image grid-wide"
            srcSet={`${coverImageUrls.small} 360w, ${coverImageUrls.medium} 720w, ${coverImageUrls.large} 1440w, ${coverImageUrls.extraLarge} 2880w`}
            src={coverImageUrls.small}
          />
        </div>

        <div className="base-16-grid clearfix bg-white">
          <Enclosure className="grid-wide">
            <header role="banner">
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
            </header>

            <TextContent>{content}</TextContent>
          </Enclosure>
        </div>
      </article>
    </React.Fragment>
  );
};

export default MarqueeTemplate;

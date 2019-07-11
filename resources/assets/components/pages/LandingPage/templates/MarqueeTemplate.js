import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Enclosure from '../../../Enclosure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../../LedeBanner/LedeBannerContainer';
import SignupButtonContainer from '../../../SignupButton/SignupButtonContainer';

const MarqueeTemplate = ({
  campaignId,
  content,
  coverImage,
  endDate,
  subtitle,
  tagline,
  title,
}) => {
  // @TODO: turn this into some helper function!
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
        <div className="base-12-grid bg-white cover-image">
          <img
            className="grid-wide"
            srcSet={`${coverImageUrls.small} 360w, ${coverImageUrls.medium} 720w, ${coverImageUrls.large} 1440w, ${coverImageUrls.extraLarge} 2880w`}
            src={coverImageUrls.small}
          />
        </div>

        <div className="clearfix bg-white">
          <Enclosure className="base-12-grid">
            <header role="banner" className="grid-wide">
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
            </header>

            <div className="grid-wide-7/10">
              <TextContent>{content}</TextContent>
            </div>

            <div className="grid-wide-3/10">
              <div>
                <h1>Campaign Info</h1>
                <dl className="clearfix">
                  {endDate ? (
                    <React.Fragment>
                      <dt>Deadline</dt>
                      <dd>
                        {format(endDate, 'MMMM do, yyyy', {
                          awareOfUnicodeTokens: true,
                        })}
                      </dd>
                      <dt>Time</dt>
                      <dd>5-10 hours</dd>
                      <dt>Action Type</dt>
                      <dd>Collect Something</dd>
                    </React.Fragment>
                  ) : null}
                </dl>
              </div>
            </div>
          </Enclosure>
        </div>
      </article>
    </React.Fragment>
  );
};

export default MarqueeTemplate;

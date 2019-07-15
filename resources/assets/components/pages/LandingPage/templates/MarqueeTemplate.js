import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Enclosure from '../../../Enclosure';
import Card from '../../../utilities/Card/Card';
import SponsorPromotion from '../../../SponsorPromotion';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../../LedeBanner/LedeBannerContainer';
import SignupButtonContainer from '../../../SignupButton/SignupButtonContainer';

const MarqueeTemplate = ({
  affiliateSponsors,
  campaignId,
  content,
  coverImage,
  endDate,
  scholarshipAmount,
  subtitle,
  tagline,
  title,
}) => {
  // @TODO: turn this into some helper function!
  const coverImageUrls = {
    extraLarge: contentfulImageUrl(coverImage.url, '2232', '1000', 'fill'), // 2880 x 1620
    large: contentfulImageUrl(coverImage.url, '1116', '500', 'fill'), // 1440 x 810
    medium: contentfulImageUrl(coverImage.url, '720', '350', 'fill'), // 720 x 405
    small: contentfulImageUrl(coverImage.url, '360', '200', 'fill'),
  };

  console.log('🖼', {
    campaignId,
    title,
    coverImage,
    coverImageUrls,
    scholarshipAmount,
    tagline,
  });

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
            <header role="banner" className="marquee-banner">
              <h1 className="marquee-banner__headline-title">{title}</h1>
              <h2 className="marquee-banner__headline-subtitle">{subtitle}</h2>
            </header>

            <div className="grid-wide-7/10 primary">
              <TextContent>{content}</TextContent>
            </div>

            <div className="grid-wide-3/10 secondary">
              <SignupButtonContainer className="w-full marquee-signup-button" />

              <Card className="bordered padded rounded campaign-info">
                <h1 className="mb-4 text-m uppercase">Campaign Info</h1>
                <dl className="clearfix">
                  {endDate ? (
                    <React.Fragment>
                      <dt>Deadline</dt>
                      <dd>
                        {format(endDate, 'MMMM do, yyyy', {
                          awareOfUnicodeTokens: true,
                        })}
                      </dd>
                    </React.Fragment>
                  ) : null}
                  <dt>Time</dt>
                  <dd>5-10 hours</dd>
                  <dt>Action Type</dt>
                  <dd>Collect Something</dd>
                  {scholarshipAmount ? (
                    <React.Fragment>
                      <dt className="campaign-info__scholarship">
                        Win A Scholarship
                      </dt>
                      <dd className="campaign-info__scholarship">$4,000</dd>
                    </React.Fragment>
                  ) : null}
                </dl>
              </Card>

              {affiliateSponsors.length ? (
                <SponsorPromotion
                  className="margin-top-md"
                  imgUrl={affiliateSponsors[0].fields.logo.url}
                  title={affiliateSponsors[0].fields.logo.title}
                />
              ) : null}
            </div>
          </Enclosure>
        </div>
      </article>
    </React.Fragment>
  );
};

export default MarqueeTemplate;

import React from 'react';
import { get } from 'lodash';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Enclosure from '../../../Enclosure';
import Card from '../../../utilities/Card/Card';
import TextContent from '../../../utilities/TextContent/TextContent';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../../../constants';
import SignupButtonContainer from '../../../SignupButton/SignupButtonContainer';
import AffiliatePromotion from '../../../utilities/AffiliatePromotion/AffiliatePromotion';
import AffiliateOptInToggleContainer from '../../../AffiliateOptInToggle/AffiliateOptInToggleContainer';
import {
  contentfulImageUrl,
  isScholarshipAffiliateReferral,
} from '../../../../helpers';

const MarqueeTemplate = ({
  additionalContent,
  affiliateCreditText,
  affiliateSponsors,
  affiliateOptInContent,
  content,
  coverImage,
  endDate,
  scholarshipAmount,
  subtitle,
  title,
}) => {
  // @TODO: If this experiment is successful we should turn generating the series urls for
  // the cover image photo at different sizes into a helper function!

  console.log(affiliateOptInContent);
  const coverImageUrls = {
    extraLarge: contentfulImageUrl(coverImage.url, '2232', '1000', 'fill'),
    large: contentfulImageUrl(coverImage.url, '1116', '500', 'fill'),
    medium: contentfulImageUrl(coverImage.url, '720', '350', 'fill'),
    small: contentfulImageUrl(coverImage.url, '360', '200', 'fill'),
  };

  const timeCommitment = get(additionalContent, 'campaignTimeCommitment', null);

  const actionType = get(additionalContent, 'campaignActionType', null);

  return (
    <React.Fragment>
      <article className="marquee-landing-page">
        <div className="base-12-grid bg-white cover-image">
          <img
            className="grid-wide"
            alt={coverImage.description || `cover photo for ${title}`}
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
              <div className="marquee-signup-button">
                <SignupButtonContainer
                  className="w-full"
                  text={
                    isScholarshipAffiliateReferral()
                      ? SCHOLARSHIP_SIGNUP_BUTTON_TEXT
                      : undefined
                  }
                />
                {affiliateOptInContent ? (
                  <AffiliateOptInToggleContainer
                    affiliateOptInContent={affiliateOptInContent}
                  />
                ) : null}
              </div>

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
                  {timeCommitment ? (
                    <React.Fragment>
                      <dt>Time</dt>
                      <dd>{timeCommitment}</dd>
                    </React.Fragment>
                  ) : null}
                  {actionType ? (
                    <React.Fragment>
                      <dt>Action Type</dt>
                      <dd>{actionType}</dd>
                    </React.Fragment>
                  ) : null}
                  {scholarshipAmount ? (
                    <React.Fragment>
                      <dt className="campaign-info__scholarship">
                        Win A Scholarship
                      </dt>
                      <dd className="campaign-info__scholarship">
                        {`$${scholarshipAmount}`}
                      </dd>
                    </React.Fragment>
                  ) : null}
                </dl>
              </Card>

              {affiliateSponsors.length ? (
                <AffiliatePromotion
                  className="margin-top-md"
                  imgUrl={
                    get(
                      additionalContent,
                      'campaignSponsorLogoAlternativeUrl',
                      null,
                    ) || affiliateSponsors[0].fields.logo.url
                  }
                  text={affiliateCreditText}
                  textClassName="text-gray-400"
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

MarqueeTemplate.propTypes = {
  additionalContent: PropTypes.object,
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliateOptInContent: PropTypes.object,
  content: PropTypes.string.isRequired,
  coverImage: PropTypes.object.isRequired,
  endDate: PropTypes.string,
  scholarshipAmount: PropTypes.number,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

MarqueeTemplate.defaultProps = {
  additionalContent: null,
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliateOptInContent: null,
  endDate: null,
  scholarshipAmount: null,
};

export default MarqueeTemplate;

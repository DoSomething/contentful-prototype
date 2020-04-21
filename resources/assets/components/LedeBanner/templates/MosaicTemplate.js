import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import CampaignSignupArrow from '../../CampaignSignupArrow';
import TextContent from '../../utilities/TextContent/TextContent';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../../constants';
import SignupButtonContainer from '../../SignupButton/SignupButtonContainer';
import AffiliatePromotion from '../../utilities/AffiliatePromotion/AffiliatePromotion';
import AffiliateOptInToggleContainer from '../../AffiliateOptInToggle/AffiliateOptInToggleContainer';
import {
  contentfulImageUrl,
  isScholarshipAffiliateReferral,
} from '../../../helpers';

import './mosaic-lede-banner.scss';

const MosaicTemplate = props => {
  const {
    affiliatedActionText,
    affiliatedActionLink,
    affiliateCreditText,
    affiliateOptInContent,
    affiliateSponsors,
    title,
    subtitle,
    blurb,
    coverImage,
    isAffiliated,
    signupArrowContent,
  } = props;

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(
      coverImage.url,
      '1600',
      '1200',
      'fill',
    )})`,
  };

  const signupButton = (
    <div className="mosaic-lede-banner__signup">
      {affiliateOptInContent ? (
        <AffiliateOptInToggleContainer
          affiliateOptInContent={affiliateOptInContent}
          textColor="#fff"
        />
      ) : null}

      <SignupButtonContainer
        className={classnames({ '-float': affiliateSponsors.length })}
        text={
          isScholarshipAffiliateReferral()
            ? SCHOLARSHIP_SIGNUP_BUTTON_TEXT
            : undefined
        }
      />
      {signupArrowContent ? (
        <CampaignSignupArrow
          content={signupArrowContent}
          className="-mosaic-arrow"
        />
      ) : null}
    </div>
  );

  const actionButton = affiliatedActionLink ? (
    <div className="mosaic-lede-banner__signup">
      <Link
        className={classnames('button', '-action')}
        to={affiliatedActionLink}
      >
        {affiliatedActionText || 'Take Action'}
      </Link>
    </div>
  ) : null;

  return (
    <header role="banner" className="mosaic-lede-banner">
      <div className="mosaic-lede-banner__image" style={backgroundImageStyle} />
      <div className="mosaic-lede-banner__content">
        <div className="wrapper">
          <div className="mosaic-lede-banner__headline">
            <h1
              className={classnames('mosaic-lede-banner__headline-title', {
                'smaller-font': title.length > 25,
              })}
            >
              {title}
            </h1>
            <h2 className="mosaic-lede-banner__headline-subtitle">
              {subtitle}
            </h2>
          </div>

          {blurb ? (
            <TextContent className="mosaic-lede-banner__blurb">
              {blurb}
            </TextContent>
          ) : null}

          {isAffiliated ? actionButton : signupButton}

          {affiliateSponsors.length ? (
            <AffiliatePromotion
              className="mosaic-lede-banner__sponsor pt-6 clear-both"
              imgUrl={affiliateSponsors[0].fields.logo.url}
              text={affiliateCreditText}
              textClassName="text-gray-600"
              title={affiliateSponsors[0].fields.logo.title}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
};

MosaicTemplate.propTypes = {
  affiliatedActionText: PropTypes.string,
  affiliatedActionLink: PropTypes.string,
  affiliateCreditText: PropTypes.string,
  affiliateOptInContent: PropTypes.object,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  blurb: PropTypes.string,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  signupArrowContent: PropTypes.string,
};

MosaicTemplate.defaultProps = {
  affiliatedActionText: null,
  affiliatedActionLink: null,
  affiliateCreditText: undefined,
  affiliateOptInContent: null,
  blurb: null,
  signupArrowContent: null,
};

export default MosaicTemplate;

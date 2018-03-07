import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Markdown from '../../Markdown';
import SignupButton from '../../SignupButton';
import SponsorPromotion from '../../SponsorPromotion';
import { contentfulImageUrl } from '../../../helpers';
import CampaignSignupArrow from '../../CampaignSignupArrow';
import AffiliateOptionContainer from '../../AffiliateOption';

import './mosaic-lede-banner.scss';

const MosaicTemplate = (props) => {
  const {
    affiliatedActionText,
    affiliatedActionLink,
    affiliateSponsors,
    title,
    subtitle,
    blurb,
    coverImage,
    isAffiliated,
    showPartnerMsgOptIn,
    signupArrowContent,
  } = props;

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '800', '600', 'fill')})`,
  };

  const signupButton = (
    <div className="mosaic-lede-banner__signup">
      <SignupButton className={classnames({ '-float': affiliateSponsors.length })} source="lede banner" />
      { signupArrowContent ? (
        <CampaignSignupArrow content={signupArrowContent} className="-mosaic-arrow" />
      ) : null }
      { showPartnerMsgOptIn ? <AffiliateOptionContainer /> : null }
    </div>
  );

  const actionButton = affiliatedActionLink ? (
    <div className="mosaic-lede-banner__signup">
      <Link className={classnames('button', '-action')} to={affiliatedActionLink}>
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
            <h1 className={classnames('mosaic-lede-banner__headline-title', { 'smaller-font': title.length > 25 })}>
              {title}
            </h1>
            <h2 className="mosaic-lede-banner__headline-subtitle">{subtitle}</h2>
          </div>

          { blurb ? <Markdown className="mosaic-lede-banner__blurb">{blurb}</Markdown> : null }

          { isAffiliated ? actionButton : signupButton }

          { affiliateSponsors.length ?
            <SponsorPromotion
              className="mosaic-lede-banner__sponsor padding-top-lg clear-both"
              imgUrl={affiliateSponsors[0].fields.logo.url}
              title={affiliateSponsors[0].fields.logo.title}
            />
            :
            null
          }
        </div>
      </div>
    </header>
  );
};

MosaicTemplate.propTypes = {
  affiliatedActionText: PropTypes.string,
  affiliatedActionLink: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  blurb: PropTypes.string,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showPartnerMsgOptIn: PropTypes.bool.isRequired,
  signupArrowContent: PropTypes.string,
};

MosaicTemplate.defaultProps = {
  affiliatedActionText: null,
  affiliatedActionLink: null,
  blurb: null,
  showPartnerMsgOptIn: false,
  signupArrowContent: null,
};

export default MosaicTemplate;

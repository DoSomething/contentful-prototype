import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Markdown from '../../Markdown';
import AffiliateOptionContainer from '../../AffiliateOption';
import SignupButtonFactory from '../../SignupButton';
import { contentfulImageUrl } from '../../../helpers';
import CampaignSignupArrow from '../../CampaignSignupArrow';
import SponsorPromotion from '../../SponsorPromotion';

const MosaicTemplate = (props) => {
  const {
    actionText,
    affiliateSponsors,
    title,
    subtitle,
    blurb,
    coverImage,
    isAffiliated,
    legacyCampaignId,
    showPartnerMsgOptIn,
    signupArrowContent,
  } = props;

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '800', '600', 'fill')})`,
  };

  const signupArrowComponent = signupArrowContent ? (
    <div className="lede-banner__arrow">
      <CampaignSignupArrow content={signupArrowContent} className="-mosaic-arrow" />
    </div>
  ) : null;

  const sponsor = affiliateSponsors[0];
  const sponsorComponent = sponsor ? (
    <div className="lede-banner__sponsor padding-top-lg clear-both">
      <SponsorPromotion
        imgUrl={sponsor.fields.logo.url}
        title={sponsor.fields.logo.title}
      />
    </div>
  ) : null;

  const buttonClassname = classnames('button', { '-float': sponsor });

  const SignupButton = SignupButtonFactory(({ clickedSignUp }) => (
    <div className="header__signup">
      <button
        className={buttonClassname}
        onClick={() => clickedSignUp(legacyCampaignId)}
      >{ actionText }</button>
      { signupArrowComponent }
      { showPartnerMsgOptIn ? <AffiliateOptionContainer /> : null }
      { sponsorComponent }
    </div>
  ), 'lede banner', { text: actionText });

  return (
    <header role="banner" className="lede-banner">
      <div className="lede-banner__image" style={backgroundImageStyle} />
      <div className="lede-banner__content">
        <div className="wrapper">
          <div className="lede-banner__headline">
            <h1 className="lede-banner__headline-title">{title}</h1>
            <h2 className="lede-banner__headline-subtitle">{subtitle}</h2>
          </div>

          { blurb ? <Markdown className="lede-banner__blurb">{blurb}</Markdown> : null }

          { isAffiliated ? null : <SignupButton /> }
        </div>
      </div>
    </header>
  );
};

MosaicTemplate.propTypes = {
  actionText: PropTypes.string.isRequired,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  blurb: PropTypes.string,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showPartnerMsgOptIn: PropTypes.bool.isRequired,
  signupArrowContent: PropTypes.string,
};

MosaicTemplate.defaultProps = {
  blurb: null,
  showPartnerMsgOptIn: false,
  signupArrowContent: null,
};

export default MosaicTemplate;

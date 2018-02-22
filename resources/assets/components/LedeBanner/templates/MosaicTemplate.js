import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Markdown from '../../Markdown';
import SignupButtonFactory from '../../SignupButton';
import SponsorPromotion from '../../SponsorPromotion';
import { contentfulImageUrl } from '../../../helpers';
import CampaignSignupArrow from '../../CampaignSignupArrow';
import AffiliateOptionContainer from '../../AffiliateOption';

import './mosaic-lede-banner.scss';

const MosaicTemplate = (props) => {
  const {
    affiliatedActionText,
    affiliatedActionLink,
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
    <CampaignSignupArrow content={signupArrowContent} className="-mosaic-arrow" />
  ) : null;

  const SignupButton = SignupButtonFactory(({ clickedSignUp }) => (
    <div className="header__signup">
      <button
        className={classnames('button', { '-float': affiliateSponsors.length })}
        onClick={() => clickedSignUp(legacyCampaignId)}
      >{ actionText }</button>
      { signupArrowComponent }
      { showPartnerMsgOptIn ? <AffiliateOptionContainer /> : null }
    </div>
  ), 'lede banner', { text: actionText });

  const actionButton = affiliatedActionLink ? (
    <div className="header__signup">
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

          { isAffiliated ? actionButton : <SignupButton /> }

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
  affiliatedActionText: null,
  affiliatedActionLink: null,
  blurb: null,
  showPartnerMsgOptIn: false,
  signupArrowContent: null,
};

export default MosaicTemplate;

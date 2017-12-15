import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import AffiliateOptionContainer from '../../AffiliateOption';
import SignupButtonFactory from '../../SignupButton';
import { contentfulImageUrl } from '../../../helpers';
import CampaignSignupArrow from '../../CampaignSignupArrow';

const MosaicTemplate = (props) => {
  const {
    actionText,
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
      { signupArrowComponent }
      <button className="button" onClick={() => clickedSignUp(legacyCampaignId)}>{ actionText }</button>
      { showPartnerMsgOptIn ? <AffiliateOptionContainer /> : null }
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

          <div className="lede-banner__blurb">
            { blurb ? <Markdown>{blurb}</Markdown> : null }
          </div>

          { isAffiliated ? null : <SignupButton /> }
        </div>
      </div>
    </header>
  );
};

MosaicTemplate.propTypes = {
  actionText: PropTypes.string.isRequired,
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

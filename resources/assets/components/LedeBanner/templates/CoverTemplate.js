import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import SignupButtonFactory from '../../SignupButton';
import SponsorPromotion from '../../SponsorPromotion';
import { contentfulImageUrl } from '../../../helpers';

import './cover-lede-banner.scss';

const CoverTemplate = (props) => {
  const {
    actionText,
    affiliateSponsors,
    coverImage,
    isAffiliated,
    legacyCampaignId,
    subtitle,
    title,
  } = props;

  const blurb = 'Want to celebrate Black History Month by supporting diversity in TV and film? Take 5 minutes and you\'ll enter to win a $3000 scholarship.';

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '1440', '810', 'fill')})`,
  };

  const SignupButton = SignupButtonFactory(({ clickedSignUp }) => (
    <div className="cover-lede-banner__signup">
      <button className="button" onClick={() => clickedSignUp(legacyCampaignId)}>{ actionText }</button>
    </div>
  ));

  return (
    <header role="banner" className="cover-lede-banner" style={backgroundImageStyle}>
      <div className="wrapper margin-horizontal-auto">
        <h1 className="cover-lede-banner__headline-title">{title}</h1>

        <h2 className="cover-lede-banner__headline-subtitle">{subtitle}</h2>

        { blurb ? <Markdown className="cover-lede-banner__blurb">{blurb}</Markdown> : null }

        { isAffiliated ? null : <SignupButton /> }

        { affiliateSponsors.length ?
          <SponsorPromotion
            className="cover-lede-banner__sponsor"
            imgUrl={affiliateSponsors[0].fields.logo.url}
            title={affiliateSponsors[0].fields.logo.title}
          />
          :
          null
        }
      </div>
    </header>
  );
};

CoverTemplate.propTypes = {
  actionText: PropTypes.string.isRequired,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CoverTemplate;

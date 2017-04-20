import React from 'react';
import Markdown from '../Markdown';
import { contentfulImageUrl } from '../../helpers';

import './lede-banner.scss';

const LedeBanner = ({
    title,
    subtitle,
    blurb,
    coverImage,
    isAffiliated,
    legacyCampaignId,
    clickedSignUp,
  }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '800', '600', 'fill')})`,
  };

  const onClick = () => clickedSignUp(legacyCampaignId, { source: 'lede banner' });

  return (
    <header role="banner" className="lede-banner">
      <div className="lede-banner__image" style={backgroundImageStyle} />
      <div className="lede-banner__content">
        <div className="wrapper">
          <div className="lede-banner__headline">
            <h1 className="lede-banner__headline-title">{title}</h1>
            <h2 className="lede-banner__headline-subtitle">{subtitle}</h2>
          </div>

          <Markdown className="lede-banner__blurb">{blurb}</Markdown>

          { isAffiliated ? null : <button className="button" onClick={onClick}>Join us</button> }
        </div>
      </div>
    </header>
  );
};

LedeBanner.propTypes = {
  blurb: React.PropTypes.string.isRequired,
  clickedSignUp: React.PropTypes.func.isRequired,
  coverImage: React.PropTypes.shape({
    description: React.PropTypes.string,
    url: React.PropTypes.string,
  }).isRequired,
  isAffiliated: React.PropTypes.bool.isRequired,
  legacyCampaignId: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default LedeBanner;

import React from 'react';
import Markdown from '../Markdown';
import { contentfulImageUrl } from '../../helpers';

import './lede-banner.scss';

const LedeBanner = ({title, subtitle, blurb, coverImage}) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '800', '600', 'fill')})`,
  };

  return (
    <header role="banner" className="lede-banner">
      <div className="lede-banner__image" style={backgroundImageStyle}></div>
      <div className="lede-banner__content">
        <div className="wrapper">
          <h1 className="lede-banner__title">{title}</h1>
          <h2 className="lede-banner__subtitle">{subtitle}</h2>
        </div>

        <Markdown className="lede-banner__blurb">{blurb}</Markdown>

        {/* @TODO: not implemented yet! Stay tuned! <button className="button">Join us</button> */}
      </div>
    </header>
  )
};

export default LedeBanner;

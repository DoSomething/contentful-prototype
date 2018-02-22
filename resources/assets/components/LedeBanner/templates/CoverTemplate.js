import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import SignupButtonFactory from '../../SignupButton';
import SponsorPromotion from '../../SponsorPromotion';
import { contentfulImageUrl } from '../../../helpers';

import './cover-lede-banner.scss';

const CoverTemplate = (props) => {
  console.log(props);

  const {
    affiliateSponsors,
    coverImage,
    isAffiliated,
    subtitle,
    title,
  } = props;

  console.log(affiliateSponsors);

  const blurb = 'Want to celebrate Black History Month by supporting diversity in TV and film? Take 5 minutes and you\'ll enter to win a $3000 scholarship.';

  // const backgroundImageStyle = {
  //   backgroundImage: `url(${contentfulImageUrl(coverImage.url, '1440', '810', 'fill')})`,
  // };

  const backgroundImageStyle = {
    backgroundImage: `url(http://wlpapers.com/images/light-background-1.jpg)`,
  }

  return (
    <header role="banner" className="cover-lede-banner" style={backgroundImageStyle}>
      <div className="wrapper margin-horizontal-auto">
        <h1 className="cover-lede-banner__headline-title">{"Some rather long title here that should likely never exist"}</h1>

        <h2 className="cover-lede-banner__headline-subtitle">{subtitle}</h2>

        { blurb ? <Markdown className="cover-lede-banner__blurb">{blurb}</Markdown> : null }

        { isAffiliated ? null : <button className="button">Join Us</button> }

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
    </header>
  );
};

export default CoverTemplate;

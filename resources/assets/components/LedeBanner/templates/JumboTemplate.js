import React from 'react';
import PropTypes from 'prop-types';

import { contentfulImageUrl } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import SignupButtonContainer from '../../SignupButton/SignupButtonContainer';
import AffiliatePromotion from '../../utilities/AffiliatePromotion/AffiliatePromotion';

import './jumbo-lede-banner.scss';

const JumboTemplate = props => {
  const {
    affiliateSponsors,
    blurb,
    coverImage,
    isAffiliated,
    subtitle,
    title,
  } = props;

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(
      coverImage.url,
      '1440',
      '500',
      'fill',
    )})`,
  };

  return (
    <header
      role="banner"
      className="jumbo-lede-banner"
      style={backgroundImageStyle}
    >
      <div className="wrapper margin-horizontal-auto">
        <h1 className="jumbo-lede-banner__headline-title">{title}</h1>

        <h2 className="jumbo-lede-banner__headline-subtitle">{subtitle}</h2>

        {blurb ? (
          <TextContent className="jumbo-lede-banner__blurb">
            {blurb}
          </TextContent>
        ) : null}

        {isAffiliated ? null : (
          <div className="jumbo-lede-banner__signup">
            <SignupButtonContainer />
          </div>
        )}

        {affiliateSponsors.length ? (
          <AffiliatePromotion
            className="jumbo-lede-banner__sponsor"
            imgUrl={affiliateSponsors[0].fields.logo.url}
            title={affiliateSponsors[0].fields.logo.title}
          />
        ) : null}
      </div>
    </header>
  );
};

JumboTemplate.propTypes = {
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  blurb: PropTypes.string,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

JumboTemplate.defaultProps = {
  blurb: null,
};

export default JumboTemplate;

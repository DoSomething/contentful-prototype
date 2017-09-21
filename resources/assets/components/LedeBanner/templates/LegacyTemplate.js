import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import SponsorPromotion from '../../SponsorPromotion';

const LegacyTemplate = (props) => {
  const {
    title,
    subtitle,
    backgroundImageUrl,
    isAffiliated,
    legacyCampaignId,
    clickedSignUp,
    endDate,
    affiliateSponsors,
  } = props;

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  // @TODO: consider whether there can be more than one affiliate, or
  // whether to grab single entry when transforming in PHP
  const sponsor = affiliateSponsors[0];

  return (
    <header role="banner" className="header -hero header--action has-promotions" style={backgroundImageStyle}>
      <div className="wrapper">
        <h1 className="header__title">{title}</h1>
        <p className="header__subtitle">{subtitle}</p>
        { endDate ? <p className="header__date">Ends {moment(endDate.date).format('MMMM Do')}</p> : null }

        { isAffiliated ? null : <div className="header__signup"><button className="button" onClick={() => clickedSignUp(legacyCampaignId, { source: 'legacy lede banner|text: Join us' })}>Sign Up</button></div>}

        {
          sponsor ?
            <SponsorPromotion
              imgUrl={sponsor.fields.logo.url}
              title={sponsor.fields.logo.title}
            />
            : null
        }
      </div>
    </header>
  );
};

LegacyTemplate.propTypes = {
  backgroundImageUrl: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  endDate: PropTypes.shape({
    date: PropTypes.string,
    timezone: PropTypes.string,
    timezone_type: PropTypes.int,
  }),
  isAffiliated: PropTypes.bool.isRequired,
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legacyCampaignId: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

LegacyTemplate.defaultProps = {
  endDate: null,
};

export default LegacyTemplate;

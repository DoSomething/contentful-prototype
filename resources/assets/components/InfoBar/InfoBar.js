import React from 'react';
import PropTypes from 'prop-types';

import AffiliateCredits from '../utilities/AffiliateCredits/AffiliateCredits';

const InfoBar = ({ affiliateSponsors, affiliatePartners, contactEmail }) => (
  <footer className="info-bar">
    <div className="default-container padding-vertical-lg padding-horizontal-md">
      <AffiliateCredits
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
      />

      <div className="info-bar__secondary">
        Questions? <a href={`mailto:${contactEmail}`}>Contact {contactEmail}</a>
      </div>
    </div>
  </footer>
);

InfoBar.propTypes = {
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  contactEmail: PropTypes.string,
};

InfoBar.defaultProps = {
  affiliateSponsors: [],
  affiliatePartners: [],
  contactEmail: 'help@dosomething.org',
};

export default InfoBar;

import React from 'react';
import PropTypes from 'prop-types';

import AffiliateCredits from '../AffiliateCredits';

const CampaignFooterContact = ({ email, name }) => (
  <div className="info-bar__secondary">
    Questions? <a href={`mailto:${email}`}>Contact {name}</a>
  </div>
);

CampaignFooterContact.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

CampaignFooterContact.defaultProps = {
  name: 'Us',
  email: 'help@dosomething.org',
};

const CampaignFooter = ({ affiliateSponsors, affiliatePartners, campaignLead }) => (
  <footer className="info-bar">
    <div className="default-container padding-vertical-lg padding-horizontal-md">
      <AffiliateCredits
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
      />
      <CampaignFooterContact {...campaignLead} />
    </div>
  </footer>
);

CampaignFooter.propTypes = {
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  affiliatePartners: PropTypes.arrayOf(PropTypes.object).isRequired,
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

CampaignFooter.defaultProps = {
  campaignLead: null,
};

export default CampaignFooter;

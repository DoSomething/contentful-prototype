import React from 'react';
import PropTypes from 'prop-types';

import AffiliateCredits from '../AffiliateCredits';

const CampaignFooter = ({ affiliateSponsors, affiliatePartners, campaignLead }) => (
  <footer className="info-bar">
    <div className="default-container padding-vertical-lg padding-horizontal-md">
      <AffiliateCredits
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
      />
      <div className="info-bar__secondary">
        Questions? <a href={`mailto:${campaignLead.email}`}>Contact {campaignLead.name}</a>
      </div>
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
  campaignLead: {
    name: 'Us',
    email: 'help@dosomething.org',
  },
};


export default CampaignFooter;

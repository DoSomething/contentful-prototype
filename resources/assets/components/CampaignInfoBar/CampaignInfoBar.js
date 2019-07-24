import React from 'react';
import PropTypes from 'prop-types';

import AffiliateCredits from '../utilities/AffiliateCredits/AffiliateCredits';

const CampaignInfoBar = ({
  affiliateCreditText,
  affiliatePartners,
  affiliateSponsors,
  contactEmail,
}) => (
  <div className="info-bar">
    <div className="default-container padding-vertical-lg padding-horizontal-md">
      <AffiliateCredits
        affiliateCreditText={affiliateCreditText}
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
      />

      <div className="info-bar__secondary">
        Questions? <a href={`mailto:${contactEmail}`}>Contact {contactEmail}</a>
      </div>
    </div>
  </div>
);

CampaignInfoBar.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  contactEmail: PropTypes.string,
};

CampaignInfoBar.defaultProps = {
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliatePartners: [],
  contactEmail: 'help@dosomething.org',
};

export default CampaignInfoBar;

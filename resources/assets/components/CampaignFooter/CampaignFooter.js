import React from 'react';
import PropTypes from 'prop-types';

import AffiliateCredit from '../AffiliateCredit';

const CampaignFooter = ({ affiliateSponsors, affiliatePartners, campaignLead }) => {
  // @TODO Either deal with potentially supporting multiple affiliates per campaign
  // as opposed to just grabbing the first one
  // or change fields in Contentful to reflect single affiliates per campaign.
  const sponser = affiliateSponsors[0];
  const partner = affiliatePartners[0];

  const affiliate = sponser || partner;

  return (
    <footer className="info-bar">
      <div className="default-container padding-vertical-lg padding-horizontal-md">
        {
          affiliate ?
            <AffiliateCredit
              link={affiliate.fields.link}
              title={affiliate.fields.title}
            /> : null
        }
        <div className="info-bar__secondary">
          Questions? <a href={`mailto:${campaignLead.email}`}>Contact {campaignLead.name}</a>
        </div>
      </div>
    </footer>
  );
};

CampaignFooter.propTypes = {
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  affiliatePartners: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
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

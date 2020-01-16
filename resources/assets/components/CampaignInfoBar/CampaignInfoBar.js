import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Modal from '../utilities/Modal/Modal';
import AffiliateCredits from '../utilities/AffiliateCredits/AffiliateCredits';
import ZendeskFormContainer from '../utilities/ZendeskForm/ZendeskFormContainer';

const CampaignInfoBar = ({
  affiliateCreditText,
  affiliateSponsors,
  affiliatePartners,
  contactEmail,
  isAffiliated,
}) => {
  const [showZendeskModal, updateShowZendeskModal] = useState(false);

  return (
    <div className="info-bar bg-gray-700">
      {showZendeskModal ? (
        <Modal onClose={() => updateShowZendeskModal(false)}>
          <ZendeskFormContainer />
        </Modal>
      ) : null}

      <div className="clearfix md:w-3/4 mx-auto px-3 py-6">
        <AffiliateCredits
          affiliateCreditText={affiliateCreditText}
          affiliateSponsors={affiliateSponsors}
          affiliatePartners={affiliatePartners}
        />

        <div className="info-bar__secondary">
          Questions?{' '}
          {isAffiliated ? (
            <button
              type="button"
              className="underline"
              onClick={() => updateShowZendeskModal(true)}
            >
              Contact Us
            </button>
          ) : (
            <a href={`mailto:${contactEmail}`}>Contact {contactEmail}</a>
          )}
        </div>
      </div>
    </div>
  );
};

CampaignInfoBar.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  contactEmail: PropTypes.string,
  isAffiliated: PropTypes.bool,
};

CampaignInfoBar.defaultProps = {
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliatePartners: [],
  contactEmail: 'help@dosomething.org',
  isAffiliated: false,
};

export default CampaignInfoBar;

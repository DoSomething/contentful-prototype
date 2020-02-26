import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Modal from '../utilities/Modal/Modal';
import { isAuthenticated } from '../../helpers/auth';
import AffiliateCredits from '../utilities/AffiliateCredits/AffiliateCredits';
import ZendeskFormContainer from '../utilities/ZendeskForm/ZendeskFormContainer';

const CampaignInfoBar = ({
  affiliateCreditText,
  affiliateSponsors,
  affiliatePartners,
  contactEmail,
}) => {
  const [showZendeskModal, setShowZendeskModal] = useState(false);

  return (
    <div className="info-bar bg-gray-700">
      {showZendeskModal ? (
        <Modal onClose={() => setShowZendeskModal(false)}>
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
          {isAuthenticated() ? (
            <button
              type="button"
              className="underline"
              onClick={() => setShowZendeskModal(true)}
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
};

CampaignInfoBar.defaultProps = {
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliatePartners: [],
  contactEmail: 'campaignshelp@dosomething.org',
};

export default CampaignInfoBar;

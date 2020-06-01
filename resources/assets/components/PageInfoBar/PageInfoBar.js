import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Modal from '../utilities/Modal/Modal';
import { isAuthenticated } from '../../helpers/auth';
import { getCampaign } from '../../helpers/campaign';
import { CAMPAIGN_HELP_CONTACT_EMAIL } from '../../constants';
import AffiliateCredits from '../utilities/AffiliateCredits/AffiliateCredits';
import ZendeskFormContainer from '../utilities/ZendeskForm/ZendeskFormContainer';

const PageInfoBar = ({
  affiliateCreditText,
  affiliateSponsors,
  affiliatePartners,
  pageTitle,
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
          {/* The Zendesk form will only work for authenticated users on a campaign page. */}
          {isAuthenticated() && getCampaign() ? (
            <button
              type="button"
              className="underline"
              onClick={() => setShowZendeskModal(true)}
            >
              Contact Us
            </button>
          ) : (
            <a
              href={encodeURI(
                `mailto:${contactEmail}?subject=Question About ${pageTitle}`,
              )}
            >
              Email Us
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

PageInfoBar.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  pageTitle: PropTypes.string.isRequired,
  contactEmail: PropTypes.string,
};

PageInfoBar.defaultProps = {
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  affiliatePartners: [],
  contactEmail: CAMPAIGN_HELP_CONTACT_EMAIL,
};

export default PageInfoBar;

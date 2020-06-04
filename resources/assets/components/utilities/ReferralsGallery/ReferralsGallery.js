import React from 'react';
import PropTypes from 'prop-types';

import ReferralsList from './ReferralsList';

const ReferralsGallery = ({ referrals, placeholderIcon, referralIcon }) => (
  <div className="md:flex" data-testid="referrals-gallery">
    <ReferralsList
      referrals={referrals}
      referralIcon={referralIcon}
      placeholderIcon={placeholderIcon}
    />
    {referrals.length > 3 ? (
      <div
        data-testid="additional-referrals-count"
        className="text-center md:text-left pt-8 md:pt-16 font-bold uppercase text-gray-600"
      >
        {`+ ${referrals.length - 3} more`}
      </div>
    ) : null}
  </div>
);

ReferralsGallery.propTypes = {
  referrals: PropTypes.arrayOf(
    PropTypes.shape({ displayName: PropTypes.string.isRequired }),
  ).isRequired,
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
};

export default ReferralsGallery;

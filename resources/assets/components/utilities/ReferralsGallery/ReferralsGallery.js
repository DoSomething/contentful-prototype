import React from 'react';
import PropTypes from 'prop-types';

import ReferralsList from './ReferralsList';

const ReferralsGallery = ({ referralPosts, placeholderIcon, referralIcon }) => (
  <div className="md:flex" data-testid="referrals-gallery">
    <ReferralsList
      referralPosts={referralPosts}
      referralIcon={referralIcon}
      placeholderIcon={placeholderIcon}
    />
    {referralPosts.length > 3 ? (
      <div
        data-testid="additional-referrals-count"
        className="text-center md:text-left pt-8 md:pt-16 font-bold uppercase text-gray-600"
      >
        {`+ ${referralPosts.length - 3} more`}
      </div>
    ) : null}
  </div>
);

ReferralsGallery.propTypes = {
  referralPosts: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
};

export default ReferralsGallery;

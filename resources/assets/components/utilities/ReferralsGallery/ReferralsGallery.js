import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import ReferralsList from './ReferralsList';

const ReferralsGallery = ({ referrals, placeholderIcon, referralIcon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={classNames({ 'md:flex': !isExpanded })}
      data-testid="referrals-gallery"
    >
      <ReferralsList
        expanded={isExpanded}
        referrals={referrals}
        referralIcon={referralIcon}
        placeholderIcon={placeholderIcon}
      />
      {referrals.length > 3 ? (
        <div
          data-testid="additional-referrals-count"
          className={classNames(
            'text-center pt-8 font-bold uppercase text-blurple-500 underline cursor-pointer',
            { 'md:text-left md:pt-16': !isExpanded },
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded ? `+ ${referrals.length - 3} more` : '- show less'}
        </div>
      ) : null}
    </div>
  );
};

ReferralsGallery.propTypes = {
  referrals: PropTypes.arrayOf(
    PropTypes.shape({ displayName: PropTypes.string.isRequired }),
  ).isRequired,
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
};

export default ReferralsGallery;

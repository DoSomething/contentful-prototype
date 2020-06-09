import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import ReferralsList from './ReferralsList';

const ReferralsGallery = ({
  referralLabels,
  placeholderIcon,
  referralIcon,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={classNames({ 'md:flex': !isExpanded })}
      data-testid="referrals-gallery"
    >
      <ReferralsList
        expanded={isExpanded}
        referralLabels={referralLabels}
        referralIcon={referralIcon}
        placeholderIcon={placeholderIcon}
      />
      {referralLabels.length > 3 ? (
        <div
          className={classNames('text-center pt-6', {
            'md:pl-6 md:self-center md:pt-0': !isExpanded,
          })}
        >
          <button
            type="button"
            data-testid="additional-referrals-count"
            className="font-bold uppercase text-blurple-500 underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {!isExpanded
              ? `+ ${referralLabels.length - 3} more`
              : '- show less'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

ReferralsGallery.propTypes = {
  referralLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
};

export default ReferralsGallery;

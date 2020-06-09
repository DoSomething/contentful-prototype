import React from 'react';
import PropTypes from 'prop-types';

const VoterRegistrationReferralsListItem = props => {
  const { label, placeholderIcon, referralIcon } = props;
  const isEmpty = label === '???';

  return (
    <div
      data-testid={`referral-list-item-${!isEmpty ? 'completed' : 'empty'}`}
      className="text-center w-20 xs:w-24 sm:w-32 md:w-40"
    >
      <img
        className="mb-3"
        src={!isEmpty ? referralIcon : placeholderIcon}
        alt={!isEmpty ? 'Completed referral icon' : 'Empty icon'}
      />
      <p
        data-testid="referral-list-item-label"
        className={isEmpty ? 'text-gray-500' : null}
      >
        {label}
      </p>
    </div>
  );
};

VoterRegistrationReferralsListItem.propTypes = {
  label: PropTypes.string,
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
};

VoterRegistrationReferralsListItem.defaultProps = {
  label: '???',
};

export default VoterRegistrationReferralsListItem;
